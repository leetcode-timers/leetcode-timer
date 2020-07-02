'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {
    internalErrorHttpMessage,
    statusOkHttpMessageObject,
    unauthorizedHttpMessage
} from "../../utils/statusCodeMessages";
import {solvesTable} from "../../utils/exportConfig";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {getWithProjection, putMethod, updateToList} from "../../db/basicTableOperations";
import {solvesBody} from "../../../models/validators/solves/solvesValidator";
import {getUpdatedToken} from "../../utils/tokenManagement";
import {tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);

            let userAttempt = event.body;
            let userId = event.pathParameters.userId;
            let questionId = event.pathParameters.questionId;

            console.log("UserId: " + userId + ", questionId: " + questionId + " localAttempt: "
                + JSON.stringify(userAttempt));

            // TODO Check if the email and cookie match
            let principalObject: object = JSON.parse(event.requestContext.authorizer.principalId);
            // Logged in user and cookie don't match
            if (userId !== principalObject['email']) {
                return unauthorizedHttpMessage("Tch, tch. Don't delete someone else's account.")
            }

            if (await isQuestionAttempted(userId, questionId)) {
                return await solveQuestionFirst(userId, questionId, userAttempt, event);
            } else {
                return await addAttempt(userId, questionId, userAttempt, event);
            }
        } catch (e) {
            console.log("Error in solving the problem. Try again: ", e.message);
            return internalErrorHttpMessage("Error in dashboard")
        }
    }

function isEmptyObject(obj: object): boolean {
    return !Object.keys(obj).length;
}

let solveQuestionFirst = async (userId: string, questionId: string, userAttempt: any, event: APIGatewayProxyEvent):
    Promise<APIGatewayProxyResult> => {
    let newItem = {
        userId: userId,
        questionId: questionId,
        attempts: [
            userAttempt
        ]
    }
    try {
        await putMethod(solvesTable, newItem);
        // return statusOkHttpMessage("Added successfully: " + newItem);
        return statusOkHttpMessageObject({
            message: "Attempt Successfully recorded: " + JSON.stringify(userAttempt)
        }, getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
    } catch (e) {
        return internalErrorHttpMessage("Error in putting the attempt. Try again.");
    }
}

let addAttempt = async (userId: string, questionId: string, userAttempt: any, event: APIGatewayProxyEvent):
    Promise<APIGatewayProxyResult> => {
    try {
        await updateToList(solvesTable, {
            userId: userId,
            questionId: questionId
        }, "attempts", userAttempt, 'ALL_OLD');
        // return statusOkHttpMessage("Attempt Successfully recorded: " + JSON.stringify(userAttempt));
        return statusOkHttpMessageObject({
            message: "Attempt Successfully recorded: " + JSON.stringify(userAttempt)
        }, getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
    } catch (e) {
        return internalErrorHttpMessage("Error in adding this attempt. Try again.");
    }

}

let isQuestionAttempted = async (userId: string, questionId: string): Promise<boolean> => {
    const result: DocumentClient.GetItemOutput = await getWithProjection(solvesTable, {
        userId: userId,
        questionId: questionId
    }, 'userId');
    return result === undefined || result === null || isEmptyObject(result)
}
export const handler = middify(dashboard, {inputSchema: solvesBody});


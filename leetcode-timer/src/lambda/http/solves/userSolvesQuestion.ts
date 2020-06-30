'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {internalErrorHttpMessage, statusOkHttpMessage} from "../../utils/statusCodeMessages";
import {solvesTable} from "../../utils/exportConfig";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {getWithProjection, putMethod, updateToList} from "../../db/basicTableOperations";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);

            let userAttempt = event.body;
            let userId = event.pathParameters.userId;
            let questionId = event.pathParameters.questionId;
            console.log("UserId: " + userId + ", questionId: " + questionId + " localAttempt: " + JSON.stringify(userAttempt));
            if (await isQuestionAttempted(userId, questionId)) {
                return await solveQuestionFirst(userId, questionId, userAttempt);
            } else {
                return await addAttempt(userId, questionId, userAttempt);
            }
        } catch (e) {
            console.log("Error in solving the problem. Try again: ", e.message);
            return internalErrorHttpMessage("Error in dashboard")
        }
    }

function isEmptyObject(obj: object): boolean {
    return !Object.keys(obj).length;
}

let solveQuestionFirst = async (userId: string, questionId: string, userAttempt: any): Promise<APIGatewayProxyResult> => {
    let newItem = {
        userId: userId,
        questionId: questionId,
        attempts: [
            userAttempt
        ]
    }
    try {
        await putMethod(solvesTable, newItem);
        return statusOkHttpMessage("Added successfully: " + newItem);
    } catch (e) {
        return internalErrorHttpMessage("Error in putting the attempt")
    }
}

let addAttempt = async (userId: string, questionId: string, userAttempt: any): Promise<APIGatewayProxyResult> => {
    try {
        await updateToList(solvesTable, {
            userId: userId,
            questionId: questionId
        }, "attempts", userAttempt, 'ALL_OLD');
        return statusOkHttpMessage("Attempt Successfully recorded: " + JSON.stringify(userAttempt));
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
export const handler = middify(dashboard, {})


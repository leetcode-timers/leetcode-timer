'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {internalErrorHttpMessage, statusOkHttpMessageObject} from "../../utils/statusCodeMessages";
import {solvesTable} from "../../utils/exportConfig";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {getWithProjection} from "../../db/basicTableOperations";
import {getUpdatedToken} from "../../utils/tokenManagement";
import {tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";

`
Flow is for the backend to query the questions that the user has solved. If the user wants more info about the attempts,
 the frontend can query the attempts for that particular question
`
let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);

            let userId = event.pathParameters.userId;
            let questionId = event.pathParameters.questionId;

            // TODO Check if the email and cookie match

            const result: DocumentClient.GetItemOutput = await getWithProjection(solvesTable, {
                userId: userId,
                questionId: questionId
            }, 'attempts');

            console.log("GetItems: ", result);
            return statusOkHttpMessageObject(result.Item,
                getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs));

        } catch (e) {
            console.log("Error in getting the attempts. Try again: ", e.message);
            return internalErrorHttpMessage("Error in getting attempts")
        }
    }


export const handler = middify(dashboard, {})


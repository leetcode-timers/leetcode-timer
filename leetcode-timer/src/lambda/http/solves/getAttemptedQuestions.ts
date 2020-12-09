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
import {getUpdatedToken} from "../../utils/tokenManagement";
import {tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";

const AWS = require('aws-sdk');

`
Flow is for the backend to query the questions that the user has solved. If the user wants more info about the attempts,
 the frontend can query the attempts for that particular question
`
let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);

            let userId = event.pathParameters.userId;

            // Logged in user and cookie don't match
            let principalObject: object = JSON.parse(event.requestContext.authorizer.principalId);
            if (userId !== principalObject['email']) {
                return unauthorizedHttpMessage("Tch, tch. Request to get another user's attempted questions. Please check the email and credentials.")
            }

            const docClient = new AWS.DynamoDB.DocumentClient();
            const attemptsForQuestion: DocumentClient.QueryOutput = await docClient.query({
                TableName: solvesTable,
                KeyConditionExpression: "#usrId = :usrId",
                ExpressionAttributeNames: {
                    "#usrId": "userId"
                },
                ExpressionAttributeValues: {
                    ":usrId": userId
                },
                ProjectionExpression: 'questionId'
            }).promise();

            console.log("GetItems: ", attemptsForQuestion);
            return statusOkHttpMessageObject(attemptsForQuestion.Items,
                getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs));

        } catch (e) {
            console.log("Error in getting the questions. Try again: ", e.message);
            return internalErrorHttpMessage("Error in questions")
        }
    }


export const handler = middify(dashboard, {})


'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {
    internalErrorHttpMessage,
    notFoundHttpMessage,
    statusOkHttpMessageObject, unauthorizedHttpMessage
} from "../../utils/statusCodeMessages";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {getMethod} from "../../dao/tableOperations";
import {usersTable} from "../../utils/exportConfig";
import {getUpdatedToken} from "../../utils/tokenManagement";
import {tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);
            let userId: string = event.pathParameters.userId;
            let principalObject: object = JSON.parse(event.requestContext.authorizer.principalId);
            let id: string = principalObject['id']

            // Logged in user and cookie don't match
            if (userId !== principalObject['id']) {
                return unauthorizedHttpMessage("Tch, tch. Attempting to get other user's info." +
                    " Please check the email and credentials.",
                    getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
            }

            let emailInTable: DocumentClient.GetItemOutput = await getMethod(usersTable, {
                id: id
            });
            if (emailInTable.Item !== undefined && emailInTable.Item !== null) {
                return statusOkHttpMessageObject(emailInTable.Item,
                    getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs));
            }
            return notFoundHttpMessage("Given user not found.",
                getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs));

        } catch (e) {
            console.log("Error in getUser: ", e.message);
            return internalErrorHttpMessage("Error in getUser",
                getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
        }
    }

export const handler = middify(dashboard, {})


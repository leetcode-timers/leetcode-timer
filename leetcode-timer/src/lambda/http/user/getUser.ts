'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {
    internalErrorHttpMessage,
    notFoundHttpMessage,
    // unauthorizedHttpMessage,
    statusOkHttpMessageObject
} from "../../utils/statusCodeMessages";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {getMethod} from "../../db/basicTableOperations";
import {usersTable} from "../../utils/exportConfig";
import {getUpdatedToken} from "../../utils/tokenManagement";
import {tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);

            let principalObject: object = JSON.parse(event.requestContext.authorizer.principalId);
            let email: string = principalObject['email']

            let emailInTable: DocumentClient.GetItemOutput = await getMethod(usersTable, {
                email: email
            });
            if (emailInTable.Item !== undefined && emailInTable.Item !== null) {
                return statusOkHttpMessageObject(emailInTable.Item,
                    getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs));
            }
            return notFoundHttpMessage("Given user not found.");

        } catch (e) {
            console.log("Error in getUser: ", e.message);
            return internalErrorHttpMessage("Error in getUser")
        }
    }

export const handler = middify(dashboard, {})


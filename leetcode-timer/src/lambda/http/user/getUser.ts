'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {
    internalErrorHttpMessage,
    notFoundHttpMessage,
    unauthorizedHttpMessage,
    statusOkHttpMessageObject
} from "../../utils/statusCodeMessages";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {getMethod} from "../../db/basicTableOperations";
import {usersTable} from "../../utils/exportConfig";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);

            let email: string = event.pathParameters.userId;
            let principalObject: object = JSON.parse(event.requestContext.authorizer.principalId);

            // Logged in user and user whose resource is accessed are different
            if (email !== principalObject['email']) {
                return unauthorizedHttpMessage("Tch, tch. Don't ask about someone else's account.")
            }

            let emailInTable: DocumentClient.GetItemOutput = await getMethod(usersTable, {
                email: email
            });
            if (emailInTable.Item !== undefined && emailInTable.Item !== null) {
                return statusOkHttpMessageObject(emailInTable.Item)
            }
            return notFoundHttpMessage("Given user not found.");

        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalErrorHttpMessage("Error in dashboard")
        }
    }

export const handler = middify(dashboard, {})


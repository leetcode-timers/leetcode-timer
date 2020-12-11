'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {deleteMethod} from "../../dao/tableOperations";
import {usersTable} from "../../utils/exportConfig";
import {unauthorizedHttpMessage, internalErrorHttpMessage, statusOkHttpMessage} from "../../utils/statusCodeMessages";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);
            let email: string = event.pathParameters.userId;

            let principalObject: object = JSON.parse(event.requestContext.authorizer.principalId);

            // Logged in user and user whose account is to be deleted are different
            if (email !== principalObject['email']) {
                return unauthorizedHttpMessage("Tch, tch. Don't delete someone else's account.")
            }

            try {
                await deleteMethod(usersTable, {
                    email: email
                });
                return statusOkHttpMessage("User has been successfully deleted.");
            } catch (e) {
                console.log("Unable to delete user: ", e.message);
                return internalErrorHttpMessage("Unable to delete user. Please try again.");
            }


        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalErrorHttpMessage("Error in delete user")
        }
    }

export const handler = middify(dashboard, {})


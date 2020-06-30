'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {internalErrorHttpMessage} from "../../utils/statusCodeMessages";
import {deleteMethod} from "../../db/basicTableOperations";
import {usersTable} from "../../utils/exportConfig";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);
            let email: string = event.requestContext.authorizer.principalId;

            // Add validator to make sure only email or password can be changed - NOT BOTH
            // When email -> Simple update
            // When password -> Ask for old password and new password

            try {
                await deleteMethod(usersTable, {
                    email: email
                });
                return {
                    statusCode: 200,
                    body: "User has been successfully deleted."
                }
            } catch (e) {
                console.log("Unable to delete user: ", e.message);
                return {
                    statusCode: 500,
                    body: "Try again"
                };
            }


        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalErrorHttpMessage("Error in dashboard")
        }
    }

export const handler = middify(dashboard, {})


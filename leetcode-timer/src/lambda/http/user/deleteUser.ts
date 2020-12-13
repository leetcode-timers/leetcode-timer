'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {deleteMethod} from "../../dao/tableOperations";
import {usersTable} from "../../utils/exportConfig";
import {
    unauthorizedHttpMessage,
    internalErrorHttpMessage,
    statusOkHttpMessage,
} from "../../utils/statusCodeMessages";
import {getUpdatedToken, tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);
            let id: string = event.pathParameters.userId;

            let principalObject: object = JSON.parse(event.requestContext.authorizer.principalId);

            // Logged in user and user whose account is to be deleted are different
            if (id !== principalObject['id']) {
                return unauthorizedHttpMessage("Tch, tch. Don't delete someone else's account.",
                    getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
            }

            try {
                await deleteMethod(usersTable, {
                    id: id
                });
                return statusOkHttpMessage("User has been successfully deleted.",
                    getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
            } catch (e) {
                console.log("Unable to delete user: ", e.message);
                return internalErrorHttpMessage("Unable to delete user. Please try again.",
                    getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs));
            }


        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalErrorHttpMessage("Error in delete user",
                getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
        }
    }

export const handler = middify(dashboard, {})


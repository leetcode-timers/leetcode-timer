'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {
    badRequestHttpMessage,
    internalErrorHttpMessage,
    statusOkHttpMessageObject,
    unauthorizedHttpMessage
} from "../../utils/statusCodeMessages";
import {getUpdatedToken, tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";
import {updateItem} from "../../db/basicTableOperations";
import {usersTable} from "../../utils/exportConfig";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            let userId: string = event.pathParameters.userId;
            let infoToUpdate = JSON.parse(event.body);
            console.log("Updating " + userId + " information: " + JSON.stringify(infoToUpdate))

            // Logged in user and cookie don't match
            let principalObject: object = JSON.parse(event.requestContext.authorizer.principalId);
            if (userId !== principalObject['email']) {
                return unauthorizedHttpMessage("Tch, tch. Attempting to update other user's info. Please check the email and credentials.")
            }

            if (Object.keys(infoToUpdate).length > 1 || Object.keys(infoToUpdate).length < 1) {
                return badRequestHttpMessage("Error in update: Please update 1 field!")
            }

            if (infoToUpdate.hasOwnProperty('email') || infoToUpdate.hasOwnProperty('id') || infoToUpdate.hasOwnProperty('joinedAt')) {
                console.log("Illegal")
                return badRequestHttpMessage("Illegal update field. Please update legal values only.")
            }

            let result: object;

            for (let [key, value] of Object.entries(infoToUpdate)) {
                const new_values: DocumentClient.UpdateItemOutput = await updateItem(usersTable, {
                    email: userId
                }, key, '' + value, 'ALL_NEW')

                console.log(JSON.stringify(new_values))
                result = new_values.Attributes
            }


            return statusOkHttpMessageObject({
                ...result,
            }, getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))


        } catch (e) {
            console.log("Error in updateUser: ", e.message);
            return internalErrorHttpMessage("Error while updating user info")
        }
    }

export const handler = middify(dashboard, {})


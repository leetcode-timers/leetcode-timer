'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import 'source-map-support/register';

import {errorInPut} from "../../utils/constants";
import {
    badRequestHttpMessage,
    createdStatusHttpMessageObject,
    internalErrorHttpMessage, unauthorizedHttpMessage
} from "../../utils/statusCodeMessages";
import {createAccountBody} from "../../../models/validators/user/createAccountValidator";
import {sign} from 'jsonwebtoken';
import {JWTSignOptions, tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";
import {getUpdatedToken} from "../../utils/tokenManagement";
import {privateKey, usersTable} from "../../utils/exportConfig";
import {middify} from "../../utils/commonHandlers";
import {putMethod, queryGlobalSecondaryIndex} from "../../dao/tableOperations";
import {v4 as uuidv4} from 'uuid';

let createAccount =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            const body = event.body
            console.log('Request Body: ', body);

            let email: string = body['email'];
            let password: string = body['password'];
            let name: string = body['name'];
            let joinedAt: string = body['joinedAt'];

            let emailInTable: DocumentClient.QueryOutput = await queryGlobalSecondaryIndex(usersTable,
                'UserEmailIndex', 'email', email);

            if (emailInTable != null && emailInTable.Items.length > 0 && emailInTable.Items[0] != null && emailInTable.Items[0] != undefined) {
                if (emailInTable.Items[0]['password'] === password) {
                    let jwtSub = JSON.stringify({
                        id: emailInTable.Items[0]['id'],
                        email: emailInTable.Items[0]['email']
                    });
                    return sendSuccessToken(jwtSub, {
                        id: emailInTable.Items[0]['id'],
                        message: "User logged in successfully."
                    });
                } else {
                    return incorrectPassword("Incorrect password");
                }
            }
            // Email does not exist in the table
            else {
                const uuid = uuidv4();
                try {
                    if (name === undefined || name === null) {
                        return badRequestHttpMessage("Attempting to create user without name",
                            getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
                    }
                    if (joinedAt === undefined || joinedAt === null) {
                        return badRequestHttpMessage("Attempting to create user without joinedAt",
                            getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
                    }
                    await putMethod(usersTable, {
                        id: uuid,
                        email: email,
                        password: password,
                        name: name,
                        joinedAt: joinedAt
                    })
                } catch (e) {
                    console.log("Error in createUserByEmail: ", e.message)
                    return internalErrorHttpMessage(errorInPut("User"),
                        getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs));
                }
                let jwtSub = JSON.stringify({
                    id: uuid,
                    email: email
                });
                return sendSuccessToken(jwtSub, {
                    id: uuid,
                    message: "User created successfully."
                });
            }
        } catch (e) {
            console.log("Error while creating User: ", e.message)
            return internalErrorHttpMessage("Error while creating user. Please try again.",
                getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
        }
    }

function sendSuccessToken(subject: string, returnObject: object): APIGatewayProxyResult {
    const jwt = sign({sub: subject}, privateKey, JWTSignOptions)
    return createdStatusHttpMessageObject(returnObject, jwt)

}

function incorrectPassword(message: string): APIGatewayProxyResult {
    return unauthorizedHttpMessage(message, '')
}

export const handler = middify(createAccount, {inputSchema: createAccountBody});


'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import 'source-map-support/register';

import {errorInPut} from "../../utils/constants";
import {
    badRequestHttpMessage,
    createdStatusHttpMessage,
    internalErrorHttpMessage, unauthorizedHttpMessage
} from "../../utils/statusCodeMessages";
import {createAccountBody} from "../../../models/validators/user/createAccountValidator";
import {sign} from 'jsonwebtoken';
import {JWTSignOptions, tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";
import {getUpdatedToken} from "../../utils/tokenManagement";
import {privateKey, usersTable} from "../../utils/exportConfig";
import {middify} from "../../utils/commonHandlers";
import {getMethod, putMethod} from "../../dao/tableOperations";
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

            let emailInTable: DocumentClient.GetItemOutput = await getMethod(usersTable, {
                email: email
            });

            // Email already exists in the table
            if (emailInTable.Item !== undefined && emailInTable.Item !== null) {
                if (emailInTable.Item['password'] === password) {
                    let jwtSub = JSON.stringify({
                        id: emailInTable.Item['id'],
                        email: emailInTable.Item['email']
                    });
                    return sendSuccessToken(jwtSub, "User logged in successfully.");
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
                return sendSuccessToken(jwtSub, "User created successfully.");
            }
        } catch (e) {
            console.log("Error while creating User: ", e.message)
            return internalErrorHttpMessage("Error while creating user. Please try again.",
                getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
        }
    }

function sendSuccessToken(subject: string, message: string): APIGatewayProxyResult {
    const jwt = sign({sub: subject}, privateKey, JWTSignOptions)
    return createdStatusHttpMessage(message, jwt)
}

function incorrectPassword(message: string): APIGatewayProxyResult {
    return unauthorizedHttpMessage(message, '')
}

export const handler = middify(createAccount, {inputSchema: createAccountBody});


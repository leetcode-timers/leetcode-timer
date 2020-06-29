'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import 'source-map-support/register';

import {internalError, errorInPut} from "../utils/definitions";
import {createAccountBody} from "../../models/createAccountValidator";
import {sign} from 'jsonwebtoken';
import {JWTSignOptions} from "../utils/definitions";
import {privateKey} from "../utils/exportConfig";
import {JwtToken} from "../../models/JwtToken";
import {middify} from "../utils/commonHandlers";
import {getMethod, putMethod} from "../db/basicTableOperations";

const usersTable: string = process.env.USERS_TABLE;

let createAccount =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            const body = event.body
            console.log('Request Body: ', body);

            // TODO Hash the username and password right its extracted from the request
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
                    return sendSuccessToken(emailInTable.Item['email']);
                } else {
                    return incorrectPassword();
                }
            }
            // Email does not exist in the table
            else {
                try {
                    await putMethod(usersTable, {
                        email: email,
                        password: password,
                        name: name,
                        joinedAt: joinedAt
                    })
                } catch (e) {
                    console.log("Error in createUserByEmail: ", e.message)
                    return internalError(errorInPut("User"));
                }
                return sendSuccessToken(email);
            }
        } catch (e) {
            console.log("Error while creating User: ", e.message)
            return internalError("Error while creating user. Please try again.")
        }
    }

function sendSuccessToken(subject: string): APIGatewayProxyResult {
    const jwt = sign({sub: subject}, privateKey, JWTSignOptions) as JwtToken
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: {
                token: jwt
            }
        })
    };
}

function incorrectPassword(): APIGatewayProxyResult {
    return {
        statusCode: 404,
        body: JSON.stringify({
            message: "Incorrect password"
        })
    };
}

export const handler = middify(createAccount, {inputSchema: createAccountBody})


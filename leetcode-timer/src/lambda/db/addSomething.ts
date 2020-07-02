'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../utils/commonHandlers";
import {internalErrorHttpMessage} from "../utils/statusCodeMessages";
import {putMethod} from "./basicTableOperations";
import {errorInPut} from "../utils/constants";

const groupsTable: string = process.env.GROUPS_TABLE;


let db =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            let parsedBody = event.body;
            let email: string;
            let password: string;

            try {
                email = parsedBody['email'];
                password = parsedBody['password'];
            } catch (e) {
                console.log("Error: ", e.message)
            }
            console.log('Parsed Body: ', parsedBody);

            let newItem = {
                id: parsedBody['id'],
                email: email,
                password: password
            };

            try {
                await putMethod(groupsTable, newItem);
            } catch (e) {
                console.log("Error in addSomething.ts: ", e.message)
                return internalErrorHttpMessage(errorInPut("User"));
            }

            return {
                statusCode: 201,
                body: JSON.stringify({
                    message: 'Welcome to leetcode timer! An app that will help you with your prep on Leetcode.',
                    note: newItem
                }, null, 2),
            };
        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalErrorHttpMessage("Error in dashboard")
        }
    }
export const handler = middify(db, {})


'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../utils/commonHandlers";
import {internalErrorHttpMessage} from "../utils/statusCodeMessages";
import {getUpdatedToken} from "../utils/tokenManagement";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);
            const res = getUpdatedToken(event.headers.Authorization, 60);
            console.log(res);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Welcome to leetcode timer! An app that will help you with your prep on Leetcode.',
                    token: res
                }, null, 2),
            };
        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalErrorHttpMessage("Error in dashboard")
        }
    }

export const handler = middify(dashboard, {})


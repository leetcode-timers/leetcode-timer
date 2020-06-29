'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../utils/commonHandlers";
import {internalError} from "../utils/definitions";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Welcome to leetcode timer! An app that will help you with your prep on Leetcode.'
                }, null, 2),
            };
        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalError("Error in dashboard")
        }
    }

export const handler = middify(dashboard, {})


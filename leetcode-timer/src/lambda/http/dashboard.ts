import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import * as middy from 'middy';
import {cors, jsonBodyParser} from 'middy/middlewares';
import {httpErrorHandler} from 'middy/middlewares'

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        console.log('Processing: ', event);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Welcome to leetcode timer! An app that will help you with your prep on Leetcode.'
            }, null, 2),
        };
    }
);

handler
    .use(jsonBodyParser())
    .use(httpErrorHandler())
    .use(cors());

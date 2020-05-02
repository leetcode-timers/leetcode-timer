import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing: ', event);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Welcome to leetime! An app that will help you with your prep on Leetcode.',
            input: event,
        }, null, 2),
    };
};

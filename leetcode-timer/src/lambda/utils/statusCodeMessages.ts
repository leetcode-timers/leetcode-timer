import {APIGatewayProxyResult} from 'aws-lambda';

function internalErrorHttpMessage(message: string, token: string): APIGatewayProxyResult {
    return {
        statusCode: 500,
        body: JSON.stringify({
            token: token,
            body: message
        })
    }
}

function unauthorizedHttpMessage(message: string, token: string): APIGatewayProxyResult {
    return {
        statusCode: 401,
        body: JSON.stringify({
            token: token,
            body: message
        })
    }
}

function badRequestHttpMessage(message: string, token: string): APIGatewayProxyResult {
    return {
        statusCode: 400,
        body: JSON.stringify({
            token: token,
            body: message
        })
    }
}

function notFoundHttpMessage(message: string, token: string): APIGatewayProxyResult {
    return {
        statusCode: 404,
        body: JSON.stringify({
            token: token,
            body: message
        })
    }
}

function statusOkHttpMessage(message: string, token: string): APIGatewayProxyResult {
    return {
        statusCode: 200,
        body: JSON.stringify({
            token: token,
            body: message
        })
    }
}

function createdStatusHttpMessage(message: string, token: string): APIGatewayProxyResult {
    return {
        statusCode: 201,
        body: JSON.stringify({
            token: token,
            body: message
        })
    }
}


function statusOkHttpMessageObject(returnObject: object, token: string): APIGatewayProxyResult {
    return {
        statusCode: 200,
        body: JSON.stringify({
            token: token,
            body: returnObject
        }, null, 2),
    };
}


export {
    createdStatusHttpMessage,
    internalErrorHttpMessage,
    unauthorizedHttpMessage,
    badRequestHttpMessage,
    notFoundHttpMessage,
    statusOkHttpMessage,
    statusOkHttpMessageObject
}

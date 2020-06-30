import {APIGatewayProxyResult} from 'aws-lambda';

function internalErrorHttpMessage(message: string): APIGatewayProxyResult {
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: message
        })
    }
}

function unauthorizedHttpMessage(message: string): APIGatewayProxyResult {
    return {
        statusCode: 401,
        body: JSON.stringify({
            message: message
        })
    }
}

function badRequestHttpMessage(message: string): APIGatewayProxyResult {
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: message
        })
    }
}

function notFoundHttpMessage(message: string): APIGatewayProxyResult {
    return {
        statusCode: 404,
        body: JSON.stringify({
            message: message
        })
    }
}

function statusOkHttpMessage(message: string): APIGatewayProxyResult {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: message
        })
    }
}

function statusOkHttpMessageObject(returnObject: object): APIGatewayProxyResult {
    return {
        statusCode: 200,
        body: JSON.stringify({
            ...returnObject
        }, null, 2),
    };
}

export {
    internalErrorHttpMessage,
    unauthorizedHttpMessage,
    badRequestHttpMessage,
    notFoundHttpMessage,
    statusOkHttpMessage,
    statusOkHttpMessageObject
}

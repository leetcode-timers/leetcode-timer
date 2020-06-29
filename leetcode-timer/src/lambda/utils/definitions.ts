import {APIGatewayProxyResult} from 'aws-lambda';

const tokenTimeout = '2m';
const tokenEncryptionAlgorithm = 'RS256';

function internalError(message: string): APIGatewayProxyResult {
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: message
        })
    }
}

const JWTSignOptions = {
    algorithm: tokenEncryptionAlgorithm,
    expiresIn: tokenTimeout
}

function errorInPut(entityName: string): string {
    return "Unable to add " + entityName + " in the database. Please try again"
}

export {
    errorInPut,
    internalError,
    tokenTimeout,
    tokenEncryptionAlgorithm,
    JWTSignOptions
}

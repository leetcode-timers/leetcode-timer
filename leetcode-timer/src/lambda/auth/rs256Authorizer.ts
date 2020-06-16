import {APIGatewayAuthorizerHandler, APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult} from "aws-lambda";
import {verify} from 'jsonwebtoken';
import {JwtToken} from "../../models/JwtToken";
import {tokenEncryptionAlgorithm} from "../utils/definitions";

const denyAuthorizationCode = "-1"

const cert = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANwPK+4q2Cr/A5PdQ5VqX5+Yfouko9Uh
/h7R+Rf7yEgzPgLKVwyDLLKXJDb+7yT7r3nAY8D2MG4T8AvFr6Dq6pECAwEAAQ==
-----END PUBLIC KEY-----`

export const handler: APIGatewayAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent):
    Promise<APIGatewayAuthorizerResult> => {
    try {
        const jwtToken = verifyToken(event.authorizationToken);
        console.log("User was authorized");
        return authorizeUser(jwtToken.sub)
    } catch (e) {
        console.log("User was not authorized: ", e.message);
        return denyUser(denyAuthorizationCode)
    }
};

function verifyToken(authHeader: string): JwtToken {
    if (!authHeader)
        throw new Error("No authorization header");
    if (!authHeader.toLocaleLowerCase().startsWith('bearer'))
        throw new Error("Invalid authorization header");
    const token = authHeader.split(' ')[1];
    // If issuedAt is greater than current time
    // If expiredAt is less than current time
    return verify(token, cert, {algorithms: [tokenEncryptionAlgorithm]}) as JwtToken
}

function authorizeUser(id: string): any {
    return {
        principalId: id,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: '*'
                }
            ]
        }
    }
}

function denyUser(id: string): any {
    return {
        principalId: id,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Deny',
                    Resource: '*'
                }
            ]
        }
    }
}

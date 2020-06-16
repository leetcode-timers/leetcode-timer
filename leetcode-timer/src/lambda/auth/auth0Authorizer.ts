import {APIGatewayAuthorizerHandler, APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult} from "aws-lambda";

export const handler: APIGatewayAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent):
    Promise<APIGatewayAuthorizerResult> => {
    try {
        verifyToken(event.authorizationToken);
        console.log("User was authorized");
        return {
            //principalId: JWTToken.sub
            principalId: 'user',
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
    } catch (e) {
        console.log("User was not authorized: ", e.message);
        return {
            //principalId: JWTToken.sub
            principalId: 'user',
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
};

function verifyToken(authHeader: string) {
    if (!authHeader)
        throw new Error("No authorization header");
    if (!authHeader.toLocaleLowerCase().startsWith('bearer'))
        throw new Error("Invalid authorization header");
    const token = authHeader.split(' ')[1];
    if (token != '123')
        throw new Error("Invalid token");
}

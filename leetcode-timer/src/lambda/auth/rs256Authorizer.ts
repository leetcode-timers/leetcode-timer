import {APIGatewayAuthorizerHandler, APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult} from "aws-lambda";
import {verify} from 'jsonwebtoken';
import {JwtToken} from "../../auth/JwtToken";
import {tokenEncryptionAlgorithm} from "../utils/definitions";

const denyAuthorizationCode = "-1"

//Public key
// const cert = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv
// vkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHc
// aT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIy
// tvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0
// e+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWb
// V6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9
// MwIDAQAB
// -----END PUBLIC KEY-----`
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

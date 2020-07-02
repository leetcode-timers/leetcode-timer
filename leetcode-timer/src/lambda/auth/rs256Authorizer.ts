'use strict'

import {APIGatewayAuthorizerHandler, APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult} from "aws-lambda";
import {verify} from 'jsonwebtoken';
import {JwtToken} from "../../models/JwtToken";
import {tokenEncryptionAlgorithm} from "../utils/tokenManagement";
import {authorizeUser, denyUser} from "./utils";
import {publicKey} from "../utils/exportConfig";

const denyAuthorizationCode = "-1"

export const handler: APIGatewayAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent):
    Promise<APIGatewayAuthorizerResult> => {
    try {
        const jwtToken = verifyToken(event.authorizationToken);
        console.log("User was authorized");
        console.log(jwtToken);
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
    return verify(token, publicKey, {algorithms: [tokenEncryptionAlgorithm]}) as JwtToken
}



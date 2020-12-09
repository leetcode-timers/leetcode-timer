'use strict'

import {APIGatewayAuthorizerHandler, APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult} from "aws-lambda";
import {authorizeUser, denyUser} from "./utils";
import {createToken} from "../utils/exportConfig";

const defaultUserId: string = '-1';

export const handler: APIGatewayAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent):
    Promise<APIGatewayAuthorizerResult> => {
    try {
        console.log("Event: ", event)
        verifyToken(event.authorizationToken);
        console.log("User was authorized");
        return authorizeUser(defaultUserId);
    } catch (e) {
        console.log("User was not authorized: ", e.message);
        return denyUser(defaultUserId);
    }
};

function verifyToken(authHeader: string) {
    if (!authHeader)
        throw new Error("No authorization header");
    if (!authHeader.toLocaleLowerCase().startsWith('bearer'))
        throw new Error("Invalid authorization header");
    const token = authHeader.split(' ')[1];
    if (token != createToken)
        throw new Error("Invalid token");
}

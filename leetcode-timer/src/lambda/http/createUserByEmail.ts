import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';


import * as definitions from '../utils/definitions';

import {createAccountBody} from "../../models/createAccountValidator";
import {v4 as uuidv4} from 'uuid'
import {sign} from 'jsonwebtoken';
import {JWTSignOptions, privateKey} from "../utils/definitions";
import {JwtToken} from "../../models/JwtToken";
import {middify} from "../utils/commonHandlers";

let fetchedEmails = [
    {
        'id': '123',
        'email': "nsd@grr.la",
        'password': "nsd"
    },
    {
        'id': '456',
        "email": "jbezoz@amzn.com",
        "password": 'jbezoz'
    }
]


let createAccount =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const body = event.body
        console.log('Request Body: ', body);

        // Check if email is already present ( registered already )
        //          if yes, then return bad request ( email already registered )
        const email = body['email'];
        const password = body['password']

        if (isEmailUsed(email)) {
            return definitions.emailUsed(email)
        }

        // Connect to the db
        // Generate guid for the database ( from a library )
        // Push to the user table
        const uuid = uuidv4();
        fetchedEmails.push({
            "id": uuid,
            "email": email,
            "password": password
        })

        // Generate the JWT token
        // Sign the JWT token and return in response
        const jwt = sign({sub: uuid}, privateKey, JWTSignOptions) as JwtToken
        return successMessage(jwt)
    }


function isEmailUsed(email: string): boolean {
    for (let entry in fetchedEmails) {
        let fetchedEmail = fetchedEmails[entry]
        if (email == fetchedEmail.email) {
            return true;
        }
    }
    return false;
}


function successMessage(jwtToken: JwtToken): APIGatewayProxyResult {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: {
                token: jwtToken
            }
        })
    };
}

export const handler = middify(createAccount, {inputSchema: createAccountBody})


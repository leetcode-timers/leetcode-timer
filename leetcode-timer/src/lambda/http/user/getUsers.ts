'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../../utils/commonHandlers";
import {internalErrorHttpMessage, statusOkHttpMessageObject} from "../../utils/statusCodeMessages";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {scanTable} from "../../db/basicTableOperations";
import {usersTable} from "../../utils/exportConfig";
import {getUpdatedToken} from "../../utils/tokenManagement";
import {tokenUpdateDeltaInSecs} from "../../utils/tokenManagement";

let dashboard =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);
            let emailsInTable: DocumentClient.ScanOutput = await scanTable(usersTable, 5)
            return statusOkHttpMessageObject(emailsInTable.Items,
                getUpdatedToken(event.headers.Authorization, tokenUpdateDeltaInSecs))
        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalErrorHttpMessage("Error in dashboard")
        }
    }

export const handler = middify(dashboard, {})


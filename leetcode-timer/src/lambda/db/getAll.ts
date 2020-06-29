'use strict'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {middify} from "../utils/commonHandlers";
import {internalError} from "../utils/definitions";
import {getMethod} from "./basicTableOperations";

const groupsTable = process.env.GROUPS_TABLE;

let db =
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            console.log('Processing: ', event);
            // const tt = await bcrypt.hash("test", 10);
            // console.log("After encrypting: ", tt);
            // console.log("Comparing: ", await bcrypt.compare("test", tt));
            // const items = await scanTable(groupsTable, 20);
            const items = {
                "Name": "test"
            };
            const getItems = await getMethod(groupsTable, {
                id: "123"
            });
            const getItemsNo = await getMethod(groupsTable, {
                id: "786"
            });

            if (getItemsNo) {
                console.log("Item exists: ", getItemsNo);
            } else {
                console.log("Item does not exist: ", getItemsNo);
            }


            console.log("Items1: ", getItems)
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Welcome to leetcode timer! An app that will help you with your prep on Leetcode.',
                    items: items,
                    returnedList: getItems
                }, null, 2),
            };
        } catch (e) {
            console.log("Error in dashboard: ", e.message);
            return internalError("Error in dashboard")
        }
    }
export const handler = middify(db, {})


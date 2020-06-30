import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

let scanTable = async (tableName: string, limit: number): Promise<DocumentClient.ScanOutput> => {
    return await docClient.scan({
        TableName: tableName,
        Limit: limit
    }).promise();
};

let putMethod = async (tableName: string, item: object): Promise<DocumentClient.PutItemOutput> => {
    return await docClient.put({
        TableName: tableName,
        Item: item
    }).promise();
};

let getMethod = async (tableName: string, key: object): Promise<DocumentClient.GetItemOutput> => {
    return await docClient.get({
        TableName: tableName,
        Key: key
    }).promise();
};

let deleteMethod = async (tableName: string, key: object): Promise<DocumentClient.DeleteItemOutput> => {
    return await docClient.delete({
        TableName: tableName,
        Key: key
    }).promise();
}

let getWithProjection = async (tableName: string, key: object, projectionExpression: string): Promise<DocumentClient.GetItemOutput> => {
    return await docClient.get({
        TableName: tableName,
        Key: key,
        ProjectionExpression: projectionExpression
    }).promise();
}

let updateToList = async (tableName: string, key: object, attriName: string, attriVal: any, returnVal: string): Promise<DocumentClient.UpdateItemOutput> => {
    return await docClient.update({
        TableName: tableName,
        Key: key,
        UpdateExpression: 'SET #attrName = list_append(#attrName, :attrVal)',
        ExpressionAttributeNames: {
            '#attrName': attriName
        },
        ExpressionAttributeValues: {
            ':attrVal': [attriVal]
        },
        ReturnValues: returnVal
    }).promise();
}

export {
    scanTable,
    putMethod,
    getMethod,
    getWithProjection,
    deleteMethod,
    updateToList
}

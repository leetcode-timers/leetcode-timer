const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

let scanTable = async (tableName: string, limit: number) => {
    const result = await docClient.scan({
        TableName: tableName,
        Limit: limit
    }).promise();
    return result.Items;
};

let putMethod = async (tableName: string, item: object) => {
    return await docClient.put({
        TableName: tableName,
        Item: item
    }).promise();
};

let getMethod = async (tableName: string, key: object) => {
    return await docClient.get({
        TableName: tableName,
        Key: key
    }).promise();
};

export {
    scanTable,
    putMethod,
    getMethod
}

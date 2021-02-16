"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';
const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`, DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;

exports.handler = async (event: { body: string; }) => {
    if (!event.body) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    }
    const data = JSON.parse(event.body);
    //return { body: event.body };
    //const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
    //item[PRIMARY_KEY] = uuidv4();
    const params = {
        TableName: TABLE_NAME,
        Item: {
            // The attributes of the item to be created
            aid: data.aid, // The aid of the created ad
            added: Date.now(), // timestamp added (milliseconds)
            offer_name: data.offer_name
        },
    };
    try {
        await db.put(params).promise();
        const headers = {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        }
        return {
            headers,
            statusCode: 200,
            body: ''
        };
    }
    catch (dbError) {
        const errorResponse = dbError.code === 'ValidationException' && dbError.message.includes('reserved keyword') ?
            DYNAMODB_EXECUTION_ERROR : RESERVED_RESPONSE;
        return { statusCode: 500, body: errorResponse + dbError.message + ' body:' + event.body };
    }
};
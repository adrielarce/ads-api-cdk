"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';
exports.handler = async (event = {}) => {
    const requestedItemId = event.pathParameters.id;
    //return { body: requestedItemId }
    if (!requestedItemId) {
        return { statusCode: 400, body: `Error: You are missing the path parameter id` };
    }
    const params = {
        TableName: TABLE_NAME,
        /*
        Key: {
          ':aid': requestedItemId
        },
        */
        KeyConditionExpression: 'aid = :aid',
        //FilterExpression: 'contains (aid, :aid)',
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be the id of the author
        ExpressionAttributeValues: {
            ':aid': requestedItemId,
        },
    };
    try {
        const response = await db.query(params).promise();
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        };
        return {
            headers,
            statusCode: 200,
            body: JSON.stringify(response.Items)
        };
    }
    catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldC1vbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM3QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0FBRXJDLFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxRQUFhLEVBQUUsRUFBZ0IsRUFBRTtJQUU3RCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztJQUNoRCxrQ0FBa0M7SUFDbEMsSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsOENBQThDLEVBQUUsQ0FBQztLQUNsRjtJQUVELE1BQU0sTUFBTSxHQUFHO1FBQ2IsU0FBUyxFQUFFLFVBQVU7UUFDckI7Ozs7VUFJRTtRQUNGLHNCQUFzQixFQUFFLFlBQVk7UUFDcEMsMkNBQTJDO1FBQzNDLGlFQUFpRTtRQUNqRSwyREFBMkQ7UUFDM0QseUJBQXlCLEVBQUU7WUFDekIsTUFBTSxFQUFFLGVBQWU7U0FDeEI7S0FDRixDQUFDO0lBRUYsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRztZQUNkLDZCQUE2QixFQUFFLEdBQUc7WUFDbEMsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLHlEQUF5RDtTQUNuRyxDQUFBO1FBQ0QsT0FBTztZQUNMLE9BQU87WUFDUCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDckMsQ0FBQztLQUNIO0lBQUMsT0FBTyxPQUFPLEVBQUU7UUFDaEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztLQUMzRDtBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFXUyA9IHJlcXVpcmUoJ2F3cy1zZGsnKTtcbmNvbnN0IGRiID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUUgfHwgJyc7XG5jb25zdCBQUklNQVJZX0tFWSA9IHByb2Nlc3MuZW52LlBSSU1BUllfS0VZIHx8ICcnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55ID0ge30pOiBQcm9taXNlPGFueT4gPT4ge1xuXG4gIGNvbnN0IHJlcXVlc3RlZEl0ZW1JZCA9IGV2ZW50LnBhdGhQYXJhbWV0ZXJzLmlkO1xuICAvL3JldHVybiB7IGJvZHk6IHJlcXVlc3RlZEl0ZW1JZCB9XG4gIGlmICghcmVxdWVzdGVkSXRlbUlkKSB7XG4gICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogNDAwLCBib2R5OiBgRXJyb3I6IFlvdSBhcmUgbWlzc2luZyB0aGUgcGF0aCBwYXJhbWV0ZXIgaWRgIH07XG4gIH1cblxuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgIC8qXG4gICAgS2V5OiB7XG4gICAgICAnOmFpZCc6IHJlcXVlc3RlZEl0ZW1JZFxuICAgIH0sXG4gICAgKi9cbiAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnYWlkID0gOmFpZCcsXG4gICAgLy9GaWx0ZXJFeHByZXNzaW9uOiAnY29udGFpbnMgKGFpZCwgOmFpZCknLFxuICAgIC8vICdFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzJyBkZWZpbmVzIHRoZSB2YWx1ZSBpbiB0aGUgY29uZGl0aW9uXG4gICAgLy8gLSAnOnVzZXJJZCc6IGRlZmluZXMgJ3VzZXJJZCcgdG8gYmUgdGhlIGlkIG9mIHRoZSBhdXRob3JcbiAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAnOmFpZCc6IHJlcXVlc3RlZEl0ZW1JZCxcbiAgICB9LFxuICB9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYi5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsIC8vIFJlcXVpcmVkIGZvciBDT1JTIHN1cHBvcnQgdG8gd29ya1xuICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiOiB0cnVlIC8vIFJlcXVpcmVkIGZvciBjb29raWVzLCBhdXRob3JpemF0aW9uIGhlYWRlcnMgd2l0aCBIVFRQU1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGVhZGVycyxcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLkl0ZW1zKVxuICAgIH07XG4gIH0gY2F0Y2ggKGRiRXJyb3IpIHtcbiAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRiRXJyb3IpIH07XG4gIH1cbn07XG4iXX0=
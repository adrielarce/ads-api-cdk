const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
//const TABLE_NAME = process.env.TABLE_NAME || '';
//const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

export const handler = async (event: any = {}): Promise<any> => {

  const requestedItemId = event.pathParameters.id;
  //return { body: requestedItemId }
  if (!requestedItemId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  const params = {
    TableName: "ads_sst",
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
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    }
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(response.Items)
    };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};

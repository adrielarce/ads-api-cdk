"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';
exports.handler = async (event = {}) => {
    const requestedItemId = event.pathParameters.id;
    if (!requestedItemId) {
        return { statusCode: 400, body: `Error: You are missing the path parameter id` };
    }
    const params = {
        TableName: TABLE_NAME,
        Key: {
            [PRIMARY_KEY]: requestedItemId
        }
    };
    try {
        await db.delete(params).promise();
        return { statusCode: 200, body: '' };
    }
    catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbGV0ZS1vbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM3QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0FBRXJDLFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxRQUFhLEVBQUUsRUFBa0IsRUFBRTtJQUUvRCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztJQUNoRCxJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSw4Q0FBOEMsRUFBRSxDQUFDO0tBQ2xGO0lBRUQsTUFBTSxNQUFNLEdBQUc7UUFDYixTQUFTLEVBQUUsVUFBVTtRQUNyQixHQUFHLEVBQUU7WUFDSCxDQUFDLFdBQVcsQ0FBQyxFQUFFLGVBQWU7U0FDL0I7S0FDRixDQUFDO0lBRUYsSUFBSTtRQUNGLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDdEM7SUFBQyxPQUFPLE9BQU8sRUFBRTtRQUNoQixPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0tBQzNEO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuY29uc3QgZGIgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5jb25zdCBUQUJMRV9OQU1FID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSB8fCAnJztcbmNvbnN0IFBSSU1BUllfS0VZID0gcHJvY2Vzcy5lbnYuUFJJTUFSWV9LRVkgfHwgJyc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkgPSB7fSkgOiBQcm9taXNlIDxhbnk+ID0+IHtcblxuICBjb25zdCByZXF1ZXN0ZWRJdGVtSWQgPSBldmVudC5wYXRoUGFyYW1ldGVycy5pZDtcbiAgaWYgKCFyZXF1ZXN0ZWRJdGVtSWQpIHtcbiAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA0MDAsIGJvZHk6IGBFcnJvcjogWW91IGFyZSBtaXNzaW5nIHRoZSBwYXRoIHBhcmFtZXRlciBpZGAgfTtcbiAgfVxuXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgS2V5OiB7XG4gICAgICBbUFJJTUFSWV9LRVldOiByZXF1ZXN0ZWRJdGVtSWRcbiAgICB9XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5kZWxldGUocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogMjAwLCBib2R5OiAnJyB9O1xuICB9IGNhdGNoIChkYkVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogNTAwLCBib2R5OiBKU09OLnN0cmluZ2lmeShkYkVycm9yKSB9O1xuICB9XG59O1xuIl19
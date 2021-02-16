import apigateway = require('@aws-cdk/aws-apigateway');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import lambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/core');
import * as sst from "@serverless-stack/resources";

export default class AdsApiCdkStack extends sst.Stack {
  constructor(app: sst.App, id: string) {
    super(app, id);

    const dynamoTable = new dynamodb.Table(this, "Table", {
      partitionKey: { name: 'aid', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'added', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,

      // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
      // the new table, and it will remain in your account until manually deleted. By setting the policy to 
      // DESTROY, cdk destroy will delete the table (even if it has data in it)
      removalPolicy: cdk.RemovalPolicy.RETAIN, // NOT recommended for production code
    });
    dynamoTable.addGlobalSecondaryIndex({
      indexName: 'cid-index',
      partitionKey: { name: 'cid', type: dynamodb.AttributeType.STRING },
    });
    dynamoTable.addGlobalSecondaryIndex({
      indexName: 'lid-index',
      partitionKey: { name: 'lid', type: dynamodb.AttributeType.STRING },
    });

 
    const createOneLambda = new lambda.Function(this, 'createItemFunctionSST', {
      code: new lambda.AssetCode('src/lambda/create'),
      handler: 'create.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'aid'
      }
    });
    /*
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hello.handler'                // file is "hello", function is "handler"
    });
    */
    const getOneLambda = new lambda.Function(this, 'getOneItemFunctionSST', {
      code: new lambda.AssetCode('src/lambda/get-one'),
      handler: 'get-one.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'aid'
      }
    });
    /*
    const getAllLambda = new lambda.Function(this, 'getAllItemsFunction', {
      code: new lambda.AssetCode('lambda/get-all'),
      handler: 'get-all.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'itemId'
      }
    });
    const updateOne = new lambda.Function(this, 'updateItemFunction', {
      code: new lambda.AssetCode('lambda/update'),
      handler: 'update-one.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'aid'
      }
    });    
    const deleteOne = new lambda.Function(this, 'deleteItemFunction', {
      code: new lambda.AssetCode('lambda/delete'),
      handler: 'delete-one.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'aid'
      }
    });
    */
   
    //dynamoTable.grantReadWriteData(getAllLambda);
    dynamoTable.grantReadWriteData(getOneLambda);
    dynamoTable.grantReadWriteData(createOneLambda);
    //dynamoTable.grantReadWriteData(updateOne);
    //dynamoTable.grantReadWriteData(deleteOne);
    
    const api = new apigateway.RestApi(this, 'adsApiSST', {
      restApiName: 'Ads CRUD Service SST'
    });
    
    const ads = api.root.addResource('ads');
    //const getAllIntegration = new apigateway.LambdaIntegration(getAllLambda);
    //ads.addMethod('GET', getAllIntegration);

    const createOneIntegration = new apigateway.LambdaIntegration(createOneLambda);
    ads.addMethod('POST', createOneIntegration);
    
    //const helloEndpoint = api.root.addResource('hello');
    //const helloIntegration = new apigateway.LambdaIntegration(hello);
    //helloEndpoint.addMethod('GET', helloIntegration);
    addCorsOptions(ads);
    const singleItem = ads.addResource('{id}');
    const getOneIntegration = new apigateway.LambdaIntegration(getOneLambda);
    singleItem.addMethod('GET', getOneIntegration);

    //const updateOneIntegration = new apigateway.LambdaIntegration(updateOne);
    //singleItem.addMethod('PATCH', updateOneIntegration);

    //const deleteOneIntegration = new apigateway.LambdaIntegration(deleteOne);
    //singleItem.addMethod('DELETE', deleteOneIntegration);
    addCorsOptions(singleItem);
  }
}

export function addCorsOptions(apiResource: apigateway.IResource) {
  apiResource.addMethod('OPTIONS', new apigateway.MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
      responseTemplates: {
        "application/json": ""
      }
    }],
    passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  })
}

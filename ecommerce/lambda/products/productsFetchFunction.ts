import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


// Create the lambda function who will be executed
export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const lambdaRequestId = context.awsRequestId
    const RequestId = event.requestContext.requestId

    console.log(`API Gateway RequestId: ${RequestId} LambdaRequestId: ${lambdaRequestId}`)


    const method = event.httpMethod
    if (event.resource === "/product"){
        if(method === 'GET'){
            console.log('GET')
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "GET Product - OK"
                })
            }
        }
}
    // A default return if the method isn't GET or the endpoint don't match /product
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Bad Request"
        })
    }
}
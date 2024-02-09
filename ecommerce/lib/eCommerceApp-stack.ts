
import * as cdk from "aws-cdk-lib"
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"
import * as apiGateway from "aws-cdk-lib/aws-apigateway"
import * as cw from "aws-cdk-lib/aws-logs"
import { Construct } from "constructs"

interface ECommerceStackProps extends cdk.StackProps{
    productsFetchHandler: lambdaNodeJS.NodejsFunction
}

export class ECommerce extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ECommerceStackProps){
        super(scope, id, props)

        const logGroup = new cw.LogGroup(this, "ECommerceApiGroup") 
        const api = new apiGateway.RestApi(this, "ECommerceApi", {
            restApiName: "ECommerceApi",
            cloudWatchRole: true,
            deployOptions: {
                accessLogDestination: new apiGateway.LogGroupLogDestination(logGroup),
                accessLogFormat: apiGateway.AccessLogFormat.jsonWithStandardFields({
                    httpMethod: true,
                    protocol: true,
                    requestTime: true,
                    resourcePath: false,
                    responseLength: false,
                    status: true,
                })
            }
        })

        const productsFetchIntegration = new apiGateway.LambdaIntegration(props.productsFetchHandler)

        // GET from /product
        const productResource = api.root.addResource("product")
        productResource.addMethod("GET", productsFetchIntegration)
    }
}
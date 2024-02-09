import * as cdk from "aws-cdk-lib"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"

// Create a class who will launch the three funcions
export class ProductsAppStack extends cdk.Stack {
    // Use the lambda nodejs function
    readonly productsFetchHandler: lambdaNodeJS.NodejsFunction 
    
    constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope, id, props)
        // Create the fetch function who will return the products
        this.productsFetchHandler = new lambdaNodeJS.NodejsFunction(this, "ProductsFetchFunction", {
            // The name we will call the function
            functionName: "productsFetchHandler",
            // Where is our fuction
            entry: "lambda/products/productsFetchFunction.ts",
            // The function who will be executed
            handler: "handler",
            memorySize: 512,
            runtime: lambda.Runtime.NODEJS_20_X,
            timeout: cdk.Duration.seconds(1),
            bundling: {
                // Try to reach the minimum size of the code
                minify: true,
                // Don't craete the debbug file. Impreve the performace and lesser the cost
                sourceMap: false
            }
        })

    }
}
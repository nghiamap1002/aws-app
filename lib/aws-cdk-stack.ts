import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { HitCounter } from "./hitCounter";
import { TableViewer } from "cdk-dynamo-table-viewer";

export class AwsCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler",
    });
    const helloHitCounter = new HitCounter(this, "HellHitCounter", {
      downstream: hello,
    });

    const api = new apigw.LambdaRestApi(this, "Endpoint", {
      handler: helloHitCounter.handler,
    });

    new TableViewer(this, "ViewHitCounter", {
      title: "Hello Hits",
      table: helloHitCounter.table,
    });
  }
}

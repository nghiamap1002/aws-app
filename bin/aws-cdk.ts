#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AwsCdkStack } from "../lib/aws-cdk-stack";

const app = new cdk.App();
new AwsCdkStack(app, "AwsCdkStack", {
  env: {
    region: "ap-southeast-2",
  },
});

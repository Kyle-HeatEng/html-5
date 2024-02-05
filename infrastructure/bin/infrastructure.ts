#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();
new InfrastructureStack(app, "dev", {
  stackName: "websocket-html-canvas",
  keyName: "websocket-html-canvas",
  env: {
    region: "eu-west-2",
    account: "472333205021",
  },
});
app.synth();
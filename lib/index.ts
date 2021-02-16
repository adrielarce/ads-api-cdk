import AdsApiCdkStack from "./ads_api_cdk-stack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  new AdsApiCdkStack(app, "my-stack");

  // Add more stacks
}

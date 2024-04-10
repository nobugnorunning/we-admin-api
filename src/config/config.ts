import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const env = process.env.NODE_ENV;

const BaseConfig = {
  name: "We-End",
};

export default () => {
  return {
    ...BaseConfig,
    ...(yaml.load(
      readFileSync(join(__dirname, `./${env}.yaml`), "utf8"),
    ) as Record<string, any>),
  };
};

[![Build Status](https://travis-ci.org/aex-ts-node/errors?branch=master)](https://travis-ci.org/aex-ts-node/errors.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/aex-ts-node/errors/badge.svg?branch=master)](https://coveralls.io/github/aex-ts-node/errors?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# @aex/errors

```ts
import { AexErrors } from "@aex/errors";
import { Aex } from "@aex/core";
import * as path from "path";

const aex = new Aex();
const dirName = path.resolve(__dirname, "./errors");
const middleware = AexErrors(dirName, false);
aex.use(middleware);
aex.use(async (_req: any, res, scope: any) => {
  const { errors } = scope.outer;
  const { UserNotFound, PasswordNotFound } = errors;
  throw new UserNotFound("zh-CN");
  throw new UserNotFound("en-US");
  res.end("ok");
});
```

import { AexErrors } from "../src/index";
import { Aex } from "@aex/core";
import * as path from "path";
import { responseText } from "./util/util";

test("Should have AexErrors available", () => {
  expect(AexErrors).toBeTruthy();
});

test("Should have errors available with aex middlewares ", async () => {
  expect(AexErrors).toBeTruthy();
  const aex = new Aex();
  const middleware = AexErrors(path.resolve(__dirname, "./errors"), false);
  aex.use(middleware);
  // tslint:disable-next-line:variable-name
  aex.use(async (_req: any, res, scope: any) => {
    const { errors } = scope.outer;

    expect(errors).toBeTruthy();
    expect(errors.UserNotFound).toBeTruthy();
    expect(errors.PasswordNotFound).toBeTruthy();
    let catched = false;
    try {
      const UserNotFound = errors.UserNotFound;
      throw new UserNotFound("zh-CN");
    } catch (e) {
      expect(e.message === "用户没有找到！").toBeTruthy();
      catched = true;
    }
    expect(catched).toBeTruthy();

    catched = false;

    try {
      const UserNotFound = errors.UserNotFound;
      throw new UserNotFound("en-US");
    } catch (e) {
      expect(e.message === "User Not Found!").toBeTruthy();
      catched = true;
    }
    expect(catched).toBeTruthy();

    res.end("ok");
  });
  await responseText(aex, "ok");
});

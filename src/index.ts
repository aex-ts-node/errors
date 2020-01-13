import { Loader } from "@aex/loader";
import { Generator } from "errorable";

export function AexErrors(pathName: string, nameless: boolean) {
  const loader = new Loader(pathName, nameless);
  const json = loader.load();

  const errors: any = Generator.generate(json, false);

  return async (_req: any, _res: any, scope: any) => {
    scope.outer.errors = errors;
  };
}

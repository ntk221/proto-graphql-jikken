import SchemaBuilder from "@pothos/core";
import { MyContext } from "./context.js";

export const builder = new SchemaBuilder<{
  Context: MyContext;
}>({});

builder.queryType({});

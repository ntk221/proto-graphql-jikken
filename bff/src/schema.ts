import { builder } from "./builder.js";
import { Book$Ref } from "./__generated__/pothos/proto/catalogue.pb.pothos.js";
import { catalogueClient } from "./grpc-client.js";
import { GetBookRequest } from "./__generated__/proto/proto/catalogue.js";
import { Empty } from "./__generated__/proto/google/protobuf/empty.js";

builder.queryField("book", (t) =>
  t.field({
    type: Book$Ref,
    nullable: true,
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (parent, { id }) => {
      const request = GetBookRequest.create({ id });
      const response = await catalogueClient.GetBook(request);
      return response.book;
    },
  })
);

builder.queryField("books", (t) =>
  t.field({
    type: [Book$Ref],
    resolve: async () => {
      const request = Empty.create({});
      const response = await catalogueClient.ListBooks(request);
      return response.books;
    },
  })
);


export const schema = builder.toSchema();

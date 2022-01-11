import Koa from "koa";
import { createConnection } from "typeorm";
import { graphqlHTTP } from "koa-graphql";
import mount from "koa-mount";
import "reflect-metadata";
import GraphQLDefaultSchema from "./schemas/default";

createConnection().then(() => {
  const app = new Koa();

  app.use(
    mount(
      "/graphql",
      graphqlHTTP({
        schema: GraphQLDefaultSchema,
        graphiql: true,
      })
    )
  );

  app.listen(process.env.PORT);
});

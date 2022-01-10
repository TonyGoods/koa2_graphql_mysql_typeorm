import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import "reflect-metadata";

createConnection().then(() => {
  const app = new Koa();

  app.use(bodyParser());

  app.use((ctx) => {
    ctx.body = "Hello world!";
  });

  app.listen(3000);
});

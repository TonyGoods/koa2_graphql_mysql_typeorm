import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { StundetController } from "./Controllers/Student";

createConnection().then(() => {
  const app = new Koa();

  app.use(bodyParser());

  app.use(async (ctx) => {
    StundetController.fetchAllStudents(ctx);
  });

  app.listen(3000);
});

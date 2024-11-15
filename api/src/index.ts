import { Elysia } from "elysia";
import api from "./api";
import auth from "./utils/auth";

const app = new Elysia()
  .use(auth)
  .use(api)
  .listen(3000);

console.log(
  `[server]: Running at ${app.server?.hostname}:${app.server?.port}`
);
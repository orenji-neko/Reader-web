import { Elysia } from "elysia";
import api from "./api";

const app = new Elysia()
  .use(api)
  .listen(3000);

console.log(
  `[server]: Running at ${app.server?.hostname}:${app.server?.port}`
);
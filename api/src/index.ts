import { Elysia } from "elysia";
import api from "./api";

const test = () => console.log("test worked");

const app = new Elysia()
  .decorate("test", test)
  .use(api)
  .listen(3000);

console.log(
  `[server]: Running at ${app.server?.hostname}:${app.server?.port}`
);
import { Elysia } from "elysia";

import Books from "./book";
import Files from "./file";
import Category from "./category";
import Request from "./request";
import User from "./user";
import Author from "./author"

/**
 * v1 apis
 */

const app = new Elysia()
    .group("/v1", app => 
        app
            .use(Books)
            .use(Files)
            .use(Category)
            .use(Request)
            .use(User)
            .use(Author)
    );

export default app;
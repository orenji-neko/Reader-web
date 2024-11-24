import { Elysia } from "elysia";

import Books from "./book";
import Files from "./file";
import Category from "./category";
import Request from "./request";
import User from "./user";
import Author from "./author"
import Rating from "./rating";

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
            .use(Rating)
    );

export default app;
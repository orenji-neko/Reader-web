import { Elysia } from "elysia";

import Books from "./book";
import Cover from "./cover";
import Category from "./category";

/**
 * v1 apis
 */

const app = new Elysia()
    .group("/v1", app => 
        app
            .use(Books)
            .use(Cover)
            .use(Category)
    );

export default app;
import { Elysia } from "elysia";

import Books from "./book";
import Cover from "./cover";

/**
 * v1 apis
 */

const app = new Elysia()
    .group("/v1", app => 
        app
            .use(Books)
            .use(Cover)
    );

export default app;
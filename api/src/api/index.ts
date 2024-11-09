import { Elysia } from "elysia";

import v1 from "./v1";

/**
 * api configuration
 */

const app = new Elysia()
    .group("/api", app => 
        app
            .use(v1)
    );

export default app;
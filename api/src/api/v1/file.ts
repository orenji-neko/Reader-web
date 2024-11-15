/**
 * This is a file server that handles covers
 */

import { Elysia, t } from "elysia";
import { saveImage, getImage } from "../../utils/file";

const app = new Elysia()
    .get("/file/:src", async ({ params }) => {
        return getImage(params.src)
    }, {
        params: t.Object({
            src: t.String()
        })
    })
    .post("/file", async ({ body }) => {
        const { file } = body;
        
        try {
            const fileName = await saveImage(file);
            if(!fileName) {
                throw new Error();
            }
            return fileName;
        } catch {
            return "ERROR";
        }
    }, {
        body: t.Object({
            file: t.File()
        })
    })

export default app;
import Elysia, { t } from "elysia";
import auth from "../../utils/auth";
import { PrismaClient } from "@prisma/client";

const app = new Elysia()
    .decorate("prisma", new PrismaClient())
    .use(auth)
    /**
     * [GET]    /api/v1/authors
     * [DESC]   Get a list of authors.
     */
    .get("/authors", async ({ headers, prisma, jwt }) => {
        const user:any = await jwt.verify(headers.authorization)

        if(!user) {
            throw new Error("Unauthorized!")
        }

        const authors = await prisma.author.findMany();
        return authors;
    }, {
        headers: t.Object({
            authorization: t.String()
        })
    })

export default app;
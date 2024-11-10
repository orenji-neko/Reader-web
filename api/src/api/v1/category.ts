import Elysia from "elysia";
import { PrismaClient } from "@prisma/client";

const app = new Elysia()
    .decorate("prisma", new PrismaClient())
    /**
     * [GET]    /api/v1/categories
     * [DESC]   Get a list of categories.
     */
    .get("/categories", async ({ prisma }) => {
        
        const categories = await prisma.category.findMany();

        return categories;
    })
    .get("/category/:id", async ({ params, prisma }) => {
        const id = params.id;

        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        
        return category;
    });

export default app
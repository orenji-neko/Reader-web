import Elysia, { t } from "elysia";
import { PrismaClient } from "@prisma/client";
import auth from "../../utils/auth";

const app = new Elysia()
    .decorate("prisma", new PrismaClient())
    .use(auth)
    /**
     * [GET]    /api/v1/categories
     * [DESC]   Get a list of categories.
     */
    .get("/categories", async ({ headers, prisma, jwt }) => {
        const user:any = await jwt.verify(headers.authorization)

        if (!user) {
            throw new Error("Unauthorized!");
        }

        const categories = await prisma.category.findMany();

        return categories;
    }, {
        headers: t.Object({
            authorization: t.String()
        })
    })
    .get("/category/:id", async ({ params, prisma }) => {
        try {
            const id = params.id;

            const category = await prisma.category.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            if (!category) {
                return { message: "Category not found" };
            }

            return category;
        } catch (error) {
            console.error("Error fetching category:", error);
            throw new Error("Internal server error");
        }
    });

export default app;

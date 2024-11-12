import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

const app = new Elysia()
    .decorate("prisma", new PrismaClient())
    .get("/requests", async ({ prisma }) => {
        
        const config: any = {
            include: {
                book: {
                    include: {
                        author: true
                    }
                },
                reader: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                }
            }
        }

        return prisma.request.findMany(config);
    });

export default app;
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
                        name: true,
                        username: true
                    }
                }
            }
        }

        return await prisma.request.findMany(config);
    })
    .get("/requests/due", async ({ prisma }) => {
        const config = {
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
                name: true,
                username:true
              }
            }
          }
        };
      
        const requests = await prisma.request.findMany(config);
      
        // Get the current date and time
        const currentDateTime = new Date();
      
        // Filter requests where due date is equal to or greater than current date and time
        const dueRequests = requests.map(request => {
            if(request.due && request.borrowed) {
              return {
                  ...request,
                  overdue: request.due >= request.borrowed
              }
            }
            else {
              return {
                  ...request,
                  overdue: null
              }
            }
        });
      
        return dueRequests;
    });      
      

export default app;
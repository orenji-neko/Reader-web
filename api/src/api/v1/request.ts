import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import auth from "../../utils/auth";

const app = new Elysia()
    .decorate("prisma", new PrismaClient())
    .use(auth)
    .get("/requests", async ({ headers, prisma, jwt }) => {
        const auth = await jwt.verify(headers.authorization)
        if(!auth) {
          throw new Error("Unauthorized!")
        }
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

        if(auth.auth === "READER") {
          config.where = {
            readerId: auth.id
          }
        }

        return await prisma.request.findMany(config);
    }, {
      headers: t.Object({
        authorization: t.String()
      })
    })

    .get("/requests/due", async ({ prisma }) => {
      const config = {
        where: {
          due: {
            lt: new Date()
          },
          status: "APPROVED"
        },
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
      };
    
      try {
        const overdueRequests = await prisma.request.findMany(config);
        return overdueRequests.map(req => {
          if(req.due && req.borrowed) {
            
          }
        });
      } catch (err) {
        console.error("Error fetching overdue requests:", err);
        return { error: "Unable to fetch overdue requests." };
      }
    })    

    .post("/request", async ({ jwt, prisma, headers, body }) => {
      try {
        const userauth:any = await jwt.verify(headers.authorization);
        console.log(userauth);
    
        const { bookId } = body;
        console.log(bookId);
        
        if (!userauth) {
          throw new Error("Unauthorized!");
        }
    
        if (!bookId || isNaN(parseInt(bookId))) {
          throw new Error("Invalid bookId");
        }
    
        if (userauth.auth === "READER") {
          const response = await prisma.request.create({
            data: {
              book: {
                connect: {
                  id: parseInt(bookId)
                }
              },
              reader: {
                connect: {
                  id: parseInt(userauth.id)
                }
              }
            }
          });
          return response;
        } else if (userauth.auth === "LIBRARIAN") {
          // Add librarian-specific logic here
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        throw err;
      }
    }, {
      headers: t.Object({
        authorization: t.String()
      }),
      body: t.Object({
        bookId: t.String()
      })
    })

    .put("/request/approve/:id", async ({ jwt, prisma, params, headers }) => {
      try {
        const userauth:any = await jwt.verify(headers.authorization);
        const { id } = params;
    
        if (!userauth) {
          throw new Error("Unauthorized!");
        }
    
        if (userauth.auth !== "LIBRARIAN") {
          throw new Error("Unauthorized!");
        }
    
        const tempReq = await prisma.request.findUnique({ where: { id: parseInt(id) } });
        if (!tempReq) {
          throw new Error("Request not found");
        }
    
        const tempBook = await prisma.book.findUnique({ where: { id: tempReq.bookId } });
        if (!tempBook) {
          throw new Error("Book not found");
        }
    
        const result = await prisma.request.update({
          where: {
            id: parseInt(id)
          },
          data: {
            status: "APPROVED",
            managedBy: userauth.name,
            due: new Date(new Date().setDate(new Date().getDate() + 3)), // current date + 3 days
            borrowed: new Date()
          }
        });        
    
        if (tempReq.status === "DENIED" || tempReq.status === "PENDING") {
          await prisma.book.update({
            where: {
              id: tempReq.bookId
            },
            data: {
              available: tempBook.available - 1
            }
          });
        }

        // generate notification
        await prisma.notification.create({
          data: {
            description: `Your request for book ${tempBook.title} has been approved!`,
            user: {
              connect: {
                id: tempReq.readerId
              }
            },
            cover: tempBook.cover ? tempBook.cover : 'undefined.jpg'
          }
        })
    
        return result;
      } catch (err) {
          if(err) {
            console.error("Error processing deny request:", err);
            return {
              status: 500,
              message: err || "Internal Server Error"
            };
          }
      }
    }, {
      headers: t.Object({
        authorization: t.String()
      }),
      params: t.Object({
        id: t.String()
      })
    })

    .put("/request/deny/:id", async ({ jwt, prisma, params, headers }) => {
      try {
        const userauth:any = await jwt.verify(headers.authorization);
        const { id } = params;
    
        if (!userauth) {
          throw new Error("Unauthorized!");
        }
    
        if (userauth.auth !== "LIBRARIAN") {
          throw new Error("Unauthorized!");
        }
    
        const tempReq = await prisma.request.findUnique({ where: { id: parseInt(id) } });
        if (!tempReq) {
          throw new Error("Request not found");
        }
    
        const tempBook = await prisma.book.findUnique({ where: { id: tempReq.bookId } });
        if (!tempBook) {
          throw new Error("Book not found");
        }
    
        const result = await prisma.request.update({
          where: {
            id: parseInt(id)
          },
          data: {
            status: "DENIED",
          }
        });
    
        if (tempReq.status === "APPROVED" || tempReq.status === "PENDING") {
          await prisma.book.update({
            where: {
              id: tempReq.bookId
            },
            data: {
              available: tempBook.available + 1
            }
          });
        }

        // generate notification
        await prisma.notification.create({
          data: {
            description: `Your request for book ${tempBook.title} has been denied!`,
            user: {
              connect: {
                id: tempReq.readerId
              }
            },
            cover: tempBook.cover ? tempBook.cover : 'undefined.jpg'
          }
        })
    
        return result;
      } catch (err) {
        if(err) {
          console.error("Error processing deny request:", err);
          return {
            status: 500,
            message: err || "Internal Server Error"
          };
        }
      }
    }, {
      headers: t.Object({
        authorization: t.String()
      }),
      params: t.Object({
        id: t.String()
      })
    })
    
    .put("/request/return/:id", async ({ jwt, prisma, params, headers }) => {
      try {
        const userauth = await jwt.verify(headers.authorization);
        const { id } = params;
    
        if (!userauth) {
          throw new Error("Unauthorized!");
        }
    
        if (userauth.auth !== "LIBRARIAN") {
          throw new Error("Unauthorized!");
        }
    
        const tempReq = await prisma.request.findUnique({ where: { id: parseInt(id) } });
        if (!tempReq) {
          throw new Error("Request not found");
        }
    
        const tempBook = await prisma.book.findUnique({ where: { id: tempReq.bookId } });
        if (!tempBook) {
          throw new Error("Book not found");
        }
    
        const result = await prisma.request.update({
          where: {
            id: parseInt(id)
          },
          data: {
            status: "RETURNED",
          }
        });
    
        if (tempReq.status === "APPROVED" || tempReq.status === "PENDING") {
          await prisma.book.update({
            where: {
              id: tempReq.bookId
            },
            data: {
              available: tempBook.available + 1
            }
          });
        }

        // generate notification
        await prisma.notification.create({
          data: {
            description: `Your borrowed book ${tempBook.title} has been returned!`,
            user: {
              connect: {
                id: tempReq.readerId
              }
            },
            cover: tempBook.cover ? tempBook.cover : 'undefined.jpg'
          }
        })
    
        return result;
      } catch (err) {
        if(err) {
          console.error("Error processing deny request:", err);
          return {
            status: 500,
            message: err || "Internal Server Error"
          };
        }
      }
    }, {
      headers: t.Object({
        authorization: t.String()
      }),
      params: t.Object({
        id: t.String()
      })
    });  

export default app;
import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { connect } from "bun";
import { saveImage } from "../../utils/file";
import auth from "../../utils/auth";

/**
 * Books API
 */

const app = new Elysia()
    .decorate("prisma", new PrismaClient())
    .use(auth)
    /**
     * [GET]    /api/v1/books
     * [DESC]   Get a list of books.
     */
    .get("/books", async ({ query, prisma }) => {
        const { sort } = query;

        const config: any = {
            include: {
                author: true,
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                username: true
                            }
                        },
                        userId: false,
                        bookId: false
                    }
                }
            },
            orderBy: undefined
        }
        if(sort && sort === "popular") {
            config.orderBy = [{ rating: "desc" }]
        }
        else if(sort && sort === "latest") {
            config.orderBy = [{ createdAt: "desc" }]
        }


        const books = await prisma.book.findMany(config);

        return books;
    }, {
        query: t.Object({
            sort: t.Optional(t.String())
        })
    })
    /**
     * [GET]    /api/v1/book/:id
     * [DESC]   Get a list of books.
     */
    .get("/book/:id", async ({ headers,params, prisma, jwt }) => {
        const auth:any = await jwt.verify(headers.authorization)

        if(!auth) {
            throw new Error("Unauthorized!")
        }

        const config: any = {
            where: {
                id: parseInt(params.id)
            },
            include: {
                author: true,
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                username: true
                            }
                        },
                        userId: false,
                        bookId: false
                    }
                },
            },
            orderBy: undefined
        }

        const result = await prisma.book.findUnique(config);
        return result;
    }, {
        params: t.Object({
            id: t.String()
        }),
        headers: t.Object({
            authorization: t.String()
        })
    })
    /**
     * [POST]   /api/v1/book
     * [DESC]   Add a book
     */
    .post("/book", async ({ body, prisma }) => {
        
        const { title, authorId, cover, categoryId, description, available } = body;
        console.log(body);
        // saving file
        const fileName = await saveImage(cover);

        const config = {
            data: { 
                title: title,
                rating: 5, 
                status: "Available",
                cover: fileName,
                description: description,
                available: parseInt(available),
                total: parseInt(available),
                author: {
                    connect: {
                        id: parseInt(authorId ? authorId : "0")
                    }
                },
                category: {
                    connect: {
                        id: parseInt(categoryId ? categoryId : "0")
                    }
                },
            }
        }

        // creating record
        const book_added = await prisma.book.create(config);
        
        return book_added;
    }, {
        body: t.Object({
            title:      t.String(),
            authorId:   t.String(),
            categoryId: t.String(),
            description: t.String(),
            available: t.String(),
            cover:      t.File()
        }),
        headers: t.Object({
            authorization: t.String()
        })
    })
     /**
     * [POST]   /api/v1/book
     * [DESC]   Add a book
     */
     .put("/book", async ({ body, prisma, jwt, headers }) => {
        const auth:any = await jwt.verify(headers.authorization)

        if(!auth) {
            throw new Error("Unauthorized!")
        }

        try {
            const { id, title, authorId, cover, categoryId, description, available } = body;
            console.log(body);
            // saving file
            const fileName = await saveImage(cover);

            const config:any = {
                where: {
                    id: parseInt(id)
                },
                data: { 
                    title: title,
                    rating: 5, 
                    status: "Available",
                    cover: fileName,
                    description: description,
                    available: parseInt(available),
                    author: {
                        connect: {
                            id: parseInt(authorId ? authorId : "0")
                        }
                    },
                    category: {
                        connect: {
                            id: parseInt(categoryId ? categoryId : "0")
                        }
                    }
                }
            }

            // creating record
            const book_added = await prisma.book.update(config);
            
            return book_added;
        }
        catch(err) {
            throw err;
        }
    }, {
        body: t.Object({
            id:             t.String(),
            title:          t.String(),
            authorId:       t.String(),
            categoryId:     t.String(),
            description:    t.String(),
            available:      t.String(),
            cover:          t.File()
        }),
        headers: t.Object({
            authorization: t.String()
        })
    })
    .delete("/book/:id", async ({ headers, jwt, params, prisma }) => {
        
        const auth:any = await jwt.verify(headers.authorization)

        if(!auth) {
            throw new Error("Unauthorized!")
        }

        const { id } = params;
        console.log(id);

        const result = await prisma.book.delete({
            where: {
                id: parseInt(id)
            }
        })
        
        return result;
    }, {
        headers: t.Object({
            authorization: t.String()
        }),
        params: t.Object({
            id: t.String()
        })
    })

export default app;
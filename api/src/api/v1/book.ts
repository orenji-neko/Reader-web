import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { connect } from "bun";
import { saveImage } from "../../utils/file";

/**
 * Books API
 */

type BookQuery = {
    include: {
        author: boolean
    },
    orderBy: any | null
}

const app = new Elysia()
    .decorate("prisma", new PrismaClient())
    /**
     * [GET]    /api/v1/books
     * [DESC]   Get a list of books.
     */
    .get("/books", async ({ query, prisma }) => {
        const { sort } = query;

        const config: BookQuery = {
            include: {
                author: true
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
     * [POST]   /api/v1/book
     * [DESC]   Add a book
     */
    .post("/book", async ({ body, prisma }) => {
        const { title, authorId, cover} = body;

        if(!cover) {
            throw new Error();
        }
        // saving file
        const fileName = await saveImage(cover);

        // creating record
        const book_added = await prisma.book.create({ 
            data: { 
                title: title,
                rating: 5, 
                status: "Available",
                author: {
                    connect: {
                        id: parseInt(authorId ? authorId : "0")
                    }
                },
                cover: fileName
            }
        });
        
        return book_added;
    }, {
        body: t.Object({
            title:      t.String(),
            authorId:   t.Optional(t.String()),
            cover:      t.Optional(t.File())
        })
    });

export default app;
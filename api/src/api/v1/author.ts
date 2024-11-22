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
    const user: any = await jwt.verify(headers.authorization);

    if (!user) {
      throw new Error("Unauthorized!");
    }

    const authors = await prisma.author.findMany();
    return authors;
  }, {
    headers: t.Object({
      authorization: t.String()
    })
  })
  /**
   * [POST]   /api/v1/authors
   * [DESC]   Add a new author if not exists, otherwise return existing author.
   */
  .post("/authors", async ({ headers, prisma, jwt, body }) => {
    const user: any = await jwt.verify(headers.authorization);

    if (!user) {
      throw new Error("Unauthorized!");
    }

    // Check if the author already exists
    let author = await prisma.author.findFirst({
      where: {
        name: body.name
      }
    });

    // If author doesn't exist, create a new one
    if (!author) {
      author = await prisma.author.create({
        data: {
          name: body.name
        }
      });
    }

    return author;
  }, {
    headers: t.Object({
      authorization: t.String()
    }),
    body: t.Object({
      name: t.String()
    })
  });

export default app;
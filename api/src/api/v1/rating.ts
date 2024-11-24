import { PrismaClient } from "@prisma/client";
import auth from "../../utils/auth";
import { Elysia, t } from "elysia";

const Rating = new Elysia({ prefix: "/rating" })
  .decorate("prisma", new PrismaClient())
  .use(auth)

  .get("/", async ({ headers, prisma, jwt }) => {

    const { authorization } = headers;
    const auth = await jwt.verify(authorization);

    if(!auth) {
        throw new Error("Invalid token!")
    }

    const config: any = {
      where: {
        reader: auth.id
      }
    }

    const ratings = await prisma.rating.findMany(config)
    return ratings;
  }, {
    headers: t.Object({
      authorization: t.String() 
    })
  })

  .post("/", async ({ body, headers, prisma, jwt }) => {

    const { authorization } = headers;
    const auth = await jwt.verify(authorization);
  
    if (!auth) {
      throw new Error("Invalid token!");
    }
  
    const { bookId } = body;
    const readerId = parseInt(auth.id);
  
    // Check if the rating already exists
    const existingRating = await prisma.rating.findUnique({
      where: {
        bookId_readerId: {
          bookId: parseInt(bookId),
          readerId: readerId
        }
      }
    });
  
    let ratingResponse;
  
    if (existingRating) {
      // If it exists, delete the rating (unrate)
      ratingResponse = await prisma.rating.delete({
        where: {
          id: existingRating.id
        }
      });
    } else {
      // If it doesn't exist, create a new rating
      ratingResponse = await prisma.rating.create({
        data: {
          book: {
            connect: {
              id: parseInt(bookId)
            }
          },
          reader: {
            connect: {
              id: readerId
            }
          }
        }
      });
    }
  
    return ratingResponse;
  
  }, {
    headers: t.Object({
      authorization: t.String()
    }),
    body: t.Object({
      bookId: t.String()
    })
  });
  

export default Rating;
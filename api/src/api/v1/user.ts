import { PrismaClient } from "@prisma/client"
import { Elysia, t } from "elysia"
import auth from "../../utils/auth";

const app = new Elysia({ prefix: "/user" })
    .decorate("prisma", new PrismaClient())
    .use(auth)

    .post("/signup", async ({ body, prisma }) => {
        try {
            const { email, password, fullname, username, contacts } = body;

            // create
            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: await Bun.password.hash(password, "bcrypt"),
                    name: fullname,
                    username: username,
                    contacts: contacts
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    username: true,
                }
            })

            return {type: "Success", user: user}
        }
        catch(err) {
            throw new Error("Invalid signup!")
        }
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String(),
            fullname: t.String(),
            username: t.String(),
            contacts: t.String()
        })
    })

    .post("/login", async ({ prisma, jwt, body, set }) => {
        try {
            const { email, password } = body;

            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    email: email
                }
            });

            if(!await Bun.password.verify(password, user.password)) {
                throw new Error("Invalid password!")
            }

            const token = await jwt.sign({
                id: user.id,
                email: user.email,
                fullname: user.name,
                username: user.username,
                auth: user.auth,
            })

            return { type: "Success", token: token }
        }   
        catch(err) {
            const _err: any = err;
            set.status = 401;
            return { type: "Error", message: _err.message }
        }
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String()
        })
    })

    .get("/validate", async ({ headers, jwt, prisma }) => {
        try {
            const { authorization } = headers;
            const auth = await jwt.verify(authorization);

            if(!auth) {
                throw new Error("Invalid token!")
            }

            return auth;
        }
        catch(err) {
            throw err;
        }

    }, {   
        headers: t.Object({
            authorization: t.String()
        })
    })

   /**
   * [GET]    /user/list
   * [DESC]   Get details of the authenticated user.
   */
  .get("/", async ({ headers, prisma, jwt, query }) => {
    try {
      const { authorization } = headers;
      const { filter, value } = query;
      const userauth:any = await jwt.verify(authorization);

      if (!userauth) {
        throw new Error("Invalid token!");
      }

      let users = [];
      if(filter === "AUTH" && value === "READER") {
        users = await prisma.user.findMany({
            where: {
                auth: "READER"
            }
        })
      }
      else {
        users = await prisma.user.findMany();
      }

      return users;
    } catch (err) {
      console.error("Error fetching user:", err);
      return {
        status: 422,
        message: err || "Unprocessable Entity"
      };
    }
  }, {
    headers: t.Object({
      authorization: t.String()
    }),
    query: t.Object({
      filter:   t.Optional(t.String()),
      value:    t.Optional(t.String())
    })
  }) 

export default app;
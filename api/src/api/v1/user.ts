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

      let config:any = {
        include: {
            requests: true
        }
      }
      
      if(filter === "AUTH" && value === "READER") {
        config.where = {
            auth: true
        }
      }

      const configRequests: any = {
        where: {
          due: {
            lt: new Date()
          },
          reader: {
            id: parseInt(userauth.id)
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

      let users = await prisma.user.findMany(config);
      users = users.map(usr => ({
        ...usr,
        requestsAmount: usr.requests.length,
        borrowedAmount: usr.requests.filter(req => req.status === "APPROVED").length,
        dueAmount: usr.requests.filter(req => new Date(req.due).getTime() <= Date.now()).length
      }))

      return users
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

  /**
   * [GET]    /user/details
   */
  .get("/details", async ({ headers, prisma, jwt }) => {
    try {
      const { authorization } = headers;
      const userauth:any = await jwt.verify(authorization);
      
      if(!userauth) {
        throw new Error("Unauthorized!")
      }

      const { id } = userauth;
      const user = await prisma.user.findUnique({
        where: {
          id: id
        }
      })
      return user;
      
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
    })
  })

  .get("/requests", async ({ prisma, query, headers, jwt }) => {
    const { authorization } = headers;
    const { filter } = query;
    const userauth:any = await jwt.verify(authorization);

    if (!userauth) {
        throw new Error("Invalid token!");
    }

    const config: any = {
        where: {
            readerId: userauth.id
        },
        include: {
            book: true
        }
    }

    if(query.filter && query.value) {
        config.where[query.filter] = query.value;
    }

    return await prisma.request.findMany(config);
  }, {
    headers: t.Object({
      authorization: t.String()
    }),
    query: t.Object({
        filter: t.Optional(t.String()),
        value: t.Optional(t.String())
    })
  })

  .put("/", async ({ headers, prisma, body, jwt }) => {
    try {
        const { authorization } = headers;
        if (!authorization) {
            return new Response(JSON.stringify({
                status: 401,
                message: "No authorization token provided"
            }), { status: 401 });
        }

        const userauth = await jwt.verify(authorization);
        if (!userauth || !userauth.id || !userauth.email) {
            return new Response(JSON.stringify({
                status: 401,
                message: "Invalid token"
            }), { status: 401 });
        }

        const { name, email, password, contacts, profile } = body;

        // Validate email matches authenticated user
        if (userauth.email !== email) {
            return new Response(JSON.stringify({
                status: 403,
                message: "Unauthorized: Email mismatch"
            }), { status: 403 });
        }

        // Update user data
        const updateData: any = {
            name,
            email,
            contacts
        };

        // Only include password if it's being updated
        if (password) {
            updateData.password = await Bun.password.hash(password, "bcrypt");
        }

        // Only include profile if it's being updated
        if (profile) {
            updateData.profile = profile;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(userauth.id)
            },
            data: updateData
        });

        return new Response(JSON.stringify({
            status: 200,
            message: "User updated successfully",
            data: {
                name: updatedUser.name,
                email: updatedUser.email,
                contacts: updatedUser.contacts,
                profile: updatedUser.profile
            }
        }), { status: 200 });

    } catch (error) {
        console.error('Server error:', error);
        return new Response(JSON.stringify({
            status: 422,
            message: error.message || "Error updating user"
        }), { status: 422 });
    }
  }, {
      headers: t.Object({
          authorization: t.String()
      }),
      body: t.Object({
          name: t.String(),
          email: t.String(),
          password: t.Optional(t.String()),  // Make password optional
          contacts: t.String(),
          profile: t.Optional(t.String())
      })
  });

export default app;
import { PrismaClient } from "@prisma/client"
import { Elysia, t } from "elysia"

const app = new Elysia({ prefix: "/user" })
    .decorate("prisma", new PrismaClient())

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
    });

export default app;
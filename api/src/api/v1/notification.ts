import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";
import auth from "../../utils/auth";

const Notification = new Elysia({ prefix: "/notification" })
  .decorate("prisma", new PrismaClient())
  .use(auth)  

  .get("/", async ({ jwt, prisma, headers }) => {
    const user:any = await jwt.verify(headers.authorization)
    if (!user) {
        throw new Error("Unauthorized!");
    }
    const notifications = await prisma.notification.findMany({
      where: {
        userId: parseInt(user.id)
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return notifications;
  }, {
    headers: t.Object({
      authorization: t.String()
    })
  })

export default Notification;
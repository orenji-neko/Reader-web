import jwt from "@elysiajs/jwt";

const auth = jwt({
    name: 'jwt',
    secret: 'adonis gaybar'
})

export default auth;
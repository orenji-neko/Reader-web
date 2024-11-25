# api/Dockerfile
FROM oven/bun:latest

WORKDIR /app
COPY . .

RUN bun install

# Run the Prisma migrations and then start the server
CMD ["sh", "-c", "bun run prisma:push && bun run dev"]
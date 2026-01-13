FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "bun db:push && bun db:seed && bun dev"]

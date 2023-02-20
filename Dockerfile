FROM oven/bun:0.5
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
EXPOSE 3000
ENTRYPOINT ["bun", "server.ts"]
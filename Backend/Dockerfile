# -------- Stage 1: Build --------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# -------- Stage 2: Production --------
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm prune --production

EXPOSE 4001

CMD ["node", "index.js"]

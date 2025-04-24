FROM node:lts-alpine AS builder
WORKDIR /app

COPY package*.json .
COPY tsconfig.json .

RUN npm ci

COPY prisma/schema.prisma ./prisma/
COPY src/ ./src/
RUN npx prisma generate
RUN npm run build

FROM node:lts-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json .
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/prisma ./prisma/
CMD [ "sh", "-c", "npm run prod" ]
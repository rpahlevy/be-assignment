FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

COPY prisma ./prisma/
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:migrate:dev"]

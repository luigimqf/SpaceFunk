FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "node", "src/main.js" ]


# Build stage
FROM node:14 as builder

WORKDIR /usr/src/app

COPY package*.json./

RUN npm ci

COPY..

RUN npm run build

# Final stage
FROM node:14-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist./dist

COPY package*.json./

RUN npm ci --production

CMD [ "node", "dist/main.js" ]

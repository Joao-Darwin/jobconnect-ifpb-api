FROM node:16.20.2

WORKDIR /backend

RUN apt-get update && apt-get upgrade -y

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npx", "prisma", "migrate", "up" ]

CMD [ "npm", "run", "start" ]
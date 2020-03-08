FROM node:13.8.0-alpine3.10

# Create a work directory
WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3100

CMD ["nodemon", "server.js"]
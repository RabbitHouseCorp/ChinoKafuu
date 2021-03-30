FROM node:15

WORKDIR /projects/chino
COPY package*.json ./
RUN npm install
COPY  . .

CMD ["node", "index.js", "--experimental-worker"]
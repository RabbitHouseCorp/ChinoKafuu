FROM node:15

WORKDIR /projects/chino
COPY package*.json ./
RUN npm install --force
COPY  . .

CMD ["node", "index.js", "--experimental-worker"]
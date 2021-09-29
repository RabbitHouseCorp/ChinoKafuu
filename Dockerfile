FROM node:14.17.5

WORKDIR /opt

COPY . .

RUN npm install

CMD ["node", "."]

 
FROM node:18-alpine

WORKDIR /app

CMD [ "git", "fetch", "origin", "main" ]
CMD [ "git", "pull", "origin", "main" ]

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
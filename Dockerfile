FROM node:18-alpine

ARG VITE_CMS_URL
ARG VITE_CMS_TOKEN

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
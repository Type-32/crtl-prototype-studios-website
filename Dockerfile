FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

ENV VITE_CMS_URL https://cms.crtl-prototype-studios.cn

CMD [ "npm", "run", "preview" ]
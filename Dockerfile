FROM node:18-alpine

ARG VITE_CMS_URL
ENV VITE_CMS_URL https://cms.crtl-prototype-studios.cn

ARG VITE_CMS_TOKEN
ENV VITE_CMS_TOKEN cb3d522899a64cbc7ae9fec73de9ebda4b137f3a703fbb3a641bb0e477fefb4a1d8c4fa18ad9550fd1ea464e1c43ac6c015ee69768f4db294886e713573165f6a386bedda3244b4265a6266e52206133bbfddf74b3a5edb7239b03ed2f48254d327a84c1321999b00eb96f437a9204c5b2f520c55a93e6e11195143ba812eb22

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
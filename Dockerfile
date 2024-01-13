FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
ENV   JWT_SECRET_KEY_EXPIRES_IN=7d \
      JWT_SECRET_KEY=blahblah
CMD npm run build ; npm run start
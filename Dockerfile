FROM node:latest
WORKDIR /app
COPY . .
RUN npm install ; npm run build
EXPOSE 8080
ENV PORT=8080 \
      JWT_SECRET_KEY_EXPIRES_IN=7d \
      JWT_SECRET_KEY=blahblah \
      DB_NAME=global_contacts \
      DB_USER=postgres \
      DB_HOST=127.0.0.1 \
      DB_PORT=5432 \
      DB_PASSWORD=password \
      DB_DRIVER=postgres
CMD ["npm", "run", "start"]
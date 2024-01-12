#!/bin/bash

psql -c "COPY users FROM './MOCK_DATA.csv' WITH (FORMAT CSV, HEADER);"

clear ;

JWT_SECRET_KEY_EXPIRES_IN=7d JWT_SECRET_KEY=blahblah DB_NAME=global_contacts DB_USER=postgres DB_HOST=127.0.0.1 DB_PORT=5432 DB_PASSWORD=7355 DB_DRIVER=postgres npm run dev ;
FROM node:18-alpine as packages
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install


FROM packages as build
WORKDIR /usr/src/app
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY ./migrations ./migrations
COPY ./src ./src
RUN npm run build


FROM packages as prod
WORKDIR /usr/src/app
RUN npm install --omit=dev --ignore-scripts
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/migrations/data ./dist/migrations/data
CMD ["node", "dist/src/bootstrapApp"]

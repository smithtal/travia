FROM node:12.16.2 as builder
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN ["npm", "install"]
RUN ["npm", "run", "build"]

FROM nginx:1.17.0
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPISE 80

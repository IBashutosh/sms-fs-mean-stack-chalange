# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install 
# RUN npm run build 
EXPOSE 5000
ENTRYPOINT [ "node", "server.js" ]


FROM node:10-alpine

RUN mkdir /app
COPY src /app/src
COPY wordset-dictionary /app/wordset-dictionary
COPY README.md /app/README.md
COPY package.json /app/package.json
WORKDIR /app
RUN yarn

ENTRYPOINT ["node", "/app/src/index.js"]
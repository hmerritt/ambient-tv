FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY index.js ./
COPY /lib ./lib

ENV PORT 8000
EXPOSE 8000

CMD [ "node", "index.js" ]

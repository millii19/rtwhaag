# pull official base image
FROM node:10

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json .
RUN npm install

# add app
COPY . .

EXPOSE 3000

# start app
CMD ["npm", "run", "start"]

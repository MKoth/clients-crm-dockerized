# pull official base image
FROM node:latest

# set working directory
RUN mkdir /frontend
WORKDIR /frontend

# install app dependencies
COPY package.json ./
RUN npm cache clean --force && npm install
RUN npm install --no-package-lock react-scripts@3.4.0 -g
# add frontend
COPY . ./

# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# start frontend
#CMD ["yarn", "run", "start"]
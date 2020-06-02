# pull official base image
FROM node:latest

# set working directory
RUN mkdir /widget
WORKDIR /widget

# install app dependencies
COPY package.json ./
RUN npm cache clean --force && npm install
# add widget
COPY . ./

# add `/widget/node_modules/.bin` to $PATH
ENV PATH /widget/node_modules/.bin:$PATH
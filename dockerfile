#Set node16 with alpine linux as the base image for this docker file
FROM node:16-alpine

#Create directory for app
WORKDIR /usr/src/app

#Copy package.json and package-lock.json to workdir
COPY package.json .
COPY yarn.lock .

#Install packages specified in package.json
RUN yarn install

#Dump source code to docker image
COPY . .

#Set PORT to 8083
ENV PORT=8083

#Open port 8083
EXPOSE 8083

#Start image-api
CMD ["yarn", "start"]

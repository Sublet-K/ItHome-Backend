# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . .

# Install app dependencies
RUN npm install

# Bundle app source
RUN npx prisma generate

# RUN npx prisma generate --schema ./prisma/schema.prisma
# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD bash ./container_run.sh

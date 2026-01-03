FROM node:hydrogen-buster
COPY graphserver.js .
COPY package.json .
COPY package-lock.json .
COPY UScities.json .
RUN npm ci && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
EXPOSE 4000
CMD node graphserver.js

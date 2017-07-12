FROM node

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    curl -sS http://nginx.org/keys/nginx_signing.key | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main \ndeb http://nginx.org/packages/mainline/ubuntu/ trusty nginx\ndeb-src http://nginx.org/packages/mainline/ubuntu/ trusty nginx" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn nginx


COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker-entrypoint.sh .
COPY ./build/package.json .
COPY ./build .
RUN yarn install --production --no-progress

ENTRYPOINT ./docker-entrypoint.sh


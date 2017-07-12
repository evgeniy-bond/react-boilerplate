#!/usr/bin/env bash

set -e
set -x

yarn
yarn run build
docker build -t /docker repo url/ .
docker push /docker repo url/

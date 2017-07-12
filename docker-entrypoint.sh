#!/usr/bin/env bash
set -e
set -x
nginx &
export SERVER=http://localhost:3000
node server.js

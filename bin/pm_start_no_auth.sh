#!/bin/bash

NO_AUTH_DEV=1 ./node_modules/.bin/pm2 start npm --name "nuxtt" -- start

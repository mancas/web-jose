#!/bin/bash
echo "Jose web server"
echo " -> $1 mode"

export NODE_ENV=$1
cd /opt/joseweb && npm start

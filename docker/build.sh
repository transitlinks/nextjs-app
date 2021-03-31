#!/bin/bash
docker rmi vhalme/txlinks-nextjs:latest
if [ -z "$1" ] && [ -z "$2" ]
then
  docker build -t vhalme/txlinks-nextjs .
  exit
fi

if [ "$1" == "--no-cache" ]
then
  docker build -t vhalme/txlinks-nextjs --no-cache .
  exit
fi

docker build -t vhalme/txlinks-nextjs:$1 .
if [ ! -z "$2" ]
then
  if [ "$2" == "--no-cache" ]
  then
    docker build -t vhalme/txlinks-nextjs:$1 --no-cache .
    exit
  fi
  docker tag vhalme/txlinks-nextjs:$1 vhalme/txlinks-nextjs:$2 $3 .
fi

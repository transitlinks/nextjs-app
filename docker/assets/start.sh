#!/bin/bash
cd /transitlinks/nextjs-app
if [ ! -z "$GIT_BRANCH" ]
then
  git checkout $GIT_BRANCH
fi
if [ ! -z "$GIT_UPDATE" ]
then
  if [ ! -z "$GIT_SHA1" ]
  then
    git reset --hard $GIT_SHA1
  else
    git pull
  fi
  yarn install
  yarn build
fi
if [ ! -z "$HTTP_PORT" ]
then
  yarn start -p $HTTP_PORT
else
  yarn start -p 6000
fi

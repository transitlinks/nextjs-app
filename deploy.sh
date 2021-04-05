#!/bin/bash
git push origin master
cd docker
./build.sh --no-cache
docker push vhalme/txlinks-nextjs:latest
cd ..
ssh root@transitlinks.net "cd scripts; ./nextjs-deploy.sh; exit;"

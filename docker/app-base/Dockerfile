FROM ubuntu:20.04
RUN apt update
RUN apt install -y build-essential python curl git vim
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
RUN ls -al
RUN bash n lts
RUN bash n 15.12.0
RUN npm install -g npm@7.8.0
RUN npm install --global yarn

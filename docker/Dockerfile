FROM vhalme/txlinks-nextjs-base
RUN mkdir /transitlinks
RUN mkdir /transitlinks/images
RUN cd /transitlinks && \
  git clone https://github.com/transitlinks/nextjs-app.git && \
  cd nextjs-app && \
  yarn install && \
  yarn build
ADD assets/start.sh /
RUN chmod a+x /start.sh
CMD /start.sh

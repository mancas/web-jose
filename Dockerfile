FROM node:6
LABEL maintainer manuel.casasbarrado@gmail.com

RUN mkdir -p /var/log/joseweb /opt/joseweb \
  && chown node:node /var/log/joseweb /opt/joseweb

WORKDIR /opt/joseweb
COPY src /opt/joseweb/src
COPY bin /opt/joseweb/bin
COPY config /opt/joseweb/config
COPY package.json /opt/joseweb/
COPY start.sh /opt/joseweb/
COPY public /opt/joseweb/public

RUN npm install
RUN npm install inotify

USER node

EXPOSE 3000

ENTRYPOINT ["/opt/joseweb/start.sh"]
CMD ["default"]

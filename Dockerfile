FROM node

ADD ./install.sh /

RUN npm install cnpm -g --registry=http://r.cnpmjs.org

RUN chmod 777 /install.sh

CMD ["/install.sh"]
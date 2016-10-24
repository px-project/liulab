FROM node

ADD ./install.sh /

RUN npm install cnpm -g

RUN chmod 777 /install.sh

CMD ["/install.sh"]
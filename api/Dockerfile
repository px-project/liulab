FROM node

MAINTAINER honpery <honpery@gmail.com>

RUN npm install forever -g --registry=http://r.cnpmjs.org

ADD ../api /code

CMD ["/code/install.sh"]
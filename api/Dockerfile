FROM node

MAINTAINER honpery <honpery@gmail.com>

RUN npm install forever -g --registry=http://r.cnpmjs.org

ADD ./ /code

RUN chmod 777 /code/install.sh

CMD ["/code/install.sh"]
FROM node

ADD ./install.sh /

RUN chmod 777 /install.sh

CMD ["/install.sh"]
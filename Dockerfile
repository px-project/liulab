FROM node

RUN cd /code/admin && npm install
RUN cd /code/api && npm install
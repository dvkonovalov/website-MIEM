FROM node:18

WORKDIR /app

RUN npm cache clean --force
RUN npm install -g wetty

EXPOSE 4001

CMD ["wetty", "--port", "4001"]

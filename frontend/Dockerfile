FROM node:latest

ENV HOST=0.0.0.0

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

EXPOSE 5173

CMD ["npm", "start"]
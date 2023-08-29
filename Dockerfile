FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 8081
RUN npm run build || true
CMD ["npm", "start"]

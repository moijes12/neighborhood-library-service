FROM node:26-alpine3.22

ENV NODE_ENV=development

WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev --legacy-peer-deps

COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
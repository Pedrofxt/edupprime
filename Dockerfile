FROM node:18-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./backend/
WORKDIR /app/backend
RUN npm install --production
COPY backend/ ./
EXPOSE 4000
CMD ["node", "server.js"]

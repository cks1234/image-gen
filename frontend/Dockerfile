FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build            
RUN npm install -g serve
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]

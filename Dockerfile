# Build stage
FROM node:lts AS builder
WORKDIR /app
COPY package.json package-lock.json ./  
RUN npm install
COPY . ./ 
RUN npm run build 

# Deploy stage
FROM nginx:1.19.0
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

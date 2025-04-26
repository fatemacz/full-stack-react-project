FROM node:23-slim AS build
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
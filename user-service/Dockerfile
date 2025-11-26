# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .

# ---- runtime stage ----
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app

ENV PORT=3001
EXPOSE 3001

CMD ["npm", "start"]

                ┌─────────────────────────┐
                │        NGINX API        │
                │        GATEWAY          │
                │    localhost:8080       │
                └──────────┬──────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ User Service │   │ Order Service│   │ Postgres DBs │
│ :3001        │   │ :3002        │   │ users/orders │
└──────────────┘   └──────────────┘   └──────────────┘

Nginx routes:

    /users → User Service

    /orders → Order Service

    /health → Both services health checks

🧩 Services & Ports
Service	URL / Port	Description
user-service	http://localhost:3001
User CRUD + health
order-service	http://localhost:3002
Order CRUD + health
nginx gateway	http://localhost:8080
API gateway routing
Postgres	localhost:5432	Two DBs: users_db, orders_db
Available API Endpoints
User Service

    GET /health

    GET /users

Order Service

    GET /health

    GET /orders

Gateway

    GET /health

    GET /users

    GET /orders

⚡ Quick Start (Local Dev)
1️⃣ Clone the repo

git clone https://github.com/iamshashank7/docker-microservices.git
cd docker-microservices

2️⃣ Build & Run everything

docker compose up --build -d

3️⃣ Stop all services

docker compose down

4️⃣ Reset Postgres data (⚠ deletes DB)

docker compose down -v

🛠 Development Notes

    Use docker compose up --build after installing any new npm packages.

    You can create a docker-compose.override.yml for:

        local volume mounts

        live code reload

        custom development config

Example override:

services:
  user-service:
    volumes:
      - ./user-service:/usr/src/app
  order-service:
    volumes:
      - ./order-service:/usr/src/app

🔐 Environment Variables

See .env.example for all variables used by:

    User service

    Order service

    Postgres

IMPORTANT:
Do NOT commit your .env file. Keep secrets local.

🗃 Database Notes

    Postgres automatically creates two databases:

        users_db

        orders_db

    infra/sql/init.sql seeds:

        sample tables

        sample users & orders

        required roles & permissions

🧪 Health Check

Test everything via Nginx gateway:

GET http://localhost:8080/health

If both services + DBs are healthy → you get a combined JSON response.

📦 Tech Stack

    Node.js / Express

    Docker & Docker Compose

    Nginx (reverse proxy / API gateway)

    PostgreSQL

    SQL init scripts

    Microservices Architecture

📄 License

This project is open-source and free.


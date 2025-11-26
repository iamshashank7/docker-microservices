CREATE USER user_service WITH PASSWORD 'password';
CREATE USER order_service WITH PASSWORD 'password';

CREATE DATABASE users_db OWNER user_service;
CREATE DATABASE orders_db OWNER order_service;

-- USERS DATABASE SETUP
\c users_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150)
);

INSERT INTO users (name, email) VALUES
('Shashank Kumar', 'shashank@example.com'),
('Aarav', 'aarav@example.com'),
('Rohit Verma', 'rohit@example.com');

-- ensure the service user can access the tables and sequences
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_service;

-- ORDERS DATABASE SETUP
\c orders_db;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (user_id, amount) VALUES
(1, 499.00),
(2, 1200.00),
(3, 999.00);

-- ensure the service user can access the tables and sequences
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO order_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO order_service;

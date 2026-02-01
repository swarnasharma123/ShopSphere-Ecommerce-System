-- Run this script in MySQL Workbench or MySQL Command Line
-- to create the database for your e-commerce application

CREATE DATABASE IF NOT EXISTS ecommerce_db;

-- Optional: Create a dedicated user for the application
-- CREATE USER IF NOT EXISTS 'ecomuser'@'localhost' IDENTIFIED BY 'ecompass';
-- GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecomuser'@'localhost';
-- FLUSH PRIVILEGES;

USE ecommerce_db;

-- The tables will be auto-created by Hibernate when you run the application
-- due to spring.jpa.hibernate.ddl-auto=update in application.properties

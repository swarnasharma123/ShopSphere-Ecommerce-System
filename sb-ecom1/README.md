# ShopSphere E-Commerce

Full‑stack e‑commerce app with Spring Boot (backend) and React + Vite (frontend).

## Tech Stack
- Backend: Spring Boot 3, Spring Security (JWT), JPA, MySQL
- Frontend: React 18, Vite, Axios, React Router

## Project Structure
- Backend root: [sb-ecom1](sb-ecom1)
- Frontend: [sb-ecom1/frontend](frontend)
- SQL setup: [setup-database.sql](../setup-database.sql)

## Prerequisites
- Java 17
- Maven (or use the included mvnw)
- Node.js 18+
- MySQL 8+

## Database Setup
1. Create a database (default: ecommerce).
2. Update credentials in [src/main/resources/application.properties](src/main/resources/application.properties).
3. (Optional) Run the SQL helper in [setup-database.sql](../setup-database.sql).

## Backend: Run
From [sb-ecom1](sb-ecom1):
- Windows:
  - mvnw.cmd spring-boot:run
- macOS/Linux:
  - ./mvnw spring-boot:run

Backend runs at: http://localhost:9999

## Frontend: Run
From [sb-ecom1/frontend](frontend):
- npm install
- npm run dev

Frontend runs at: http://localhost:5173

## Environment Notes
### JWT
Configured in [src/main/resources/application.properties](src/main/resources/application.properties):
- spring.app.jwtSecret
- spring.app.jwtExpirationMs

### OTP Email (Password Reset)
Set mail credentials in [src/main/resources/application.properties](src/main/resources/application.properties) or via env vars:
- SPRING_MAIL_HOST
- SPRING_MAIL_PORT
- SPRING_MAIL_USERNAME
- SPRING_MAIL_PASSWORD

## Common URLs
- Products: http://localhost:5173/
- Login: http://localhost:5173/login
- Register: http://localhost:5173/register
- Admin (ROLE_ADMIN required): http://localhost:5173/admin/categories

## Build
Backend build (from [sb-ecom1](sb-ecom1)):
- mvnw.cmd clean package

Frontend build (from [sb-ecom1/frontend](frontend)):
- npm run build

## Notes
- Images are loaded directly in the frontend via URLs; invalid images show a placeholder.
- Admin routes are protected by role checks on the frontend and backend security.

## License
For demo and learning purposes.

# ShopSphere E-Commerce System

A full-stack e-commerce application built with Spring Boot and React, featuring user authentication, product catalog, shopping cart, order management, and admin panel.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-17-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)
![React](https://img.shields.io/badge/React-18.2-blue.svg)

## 🌟 Features

### Customer Features
- 🔐 User authentication (Register, Login, Password Reset with OTP)
- 🛍️ Browse products with categories and search
- 🛒 Shopping cart management
- 📦 Order placement and tracking
- 👤 User profile and address management
- 🔍 Product details with images
- 📱 Responsive design for mobile and desktop

### Admin Features
- 📊 Admin dashboard
- 📁 Category management (Create, Update, Delete)
- 📦 Product management (CRUD operations)
- 🖼️ Image upload for products
- 👥 User management

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.x
- **Security:** Spring Security with JWT Authentication
- **Database:** MySQL 8+
- **ORM:** Spring Data JPA / Hibernate
- **Build Tool:** Maven
- **Email:** Spring Mail (for OTP password reset)
- **Java Version:** 17

### Frontend
- **Framework:** React 18.2
- **Build Tool:** Vite 5
- **Routing:** React Router DOM 6
- **HTTP Client:** Axios
- **Styling:** Custom CSS

## 📁 Project Structure

```
ecommerce project/
├── sb-ecom1/                          # Backend & Frontend root
│   ├── src/main/java/                 # Java source files
│   │   └── com/ecommerce1/sb_ecom1/
│   │       ├── config/                # Configuration classes
│   │       ├── Controller/            # REST Controllers
│   │       ├── model/                 # JPA Entities
│   │       ├── repositories/          # JPA Repositories
│   │       ├── security/              # Security & JWT
│   │       ├── service/               # Business logic
│   │       └── exceptions/            # Custom exceptions
│   ├── src/main/resources/
│   │   └── application.properties     # Backend configuration
│   ├── frontend/                      # React frontend
│   │   ├── src/
│   │   │   ├── api/                   # API client services
│   │   │   ├── components/            # React components
│   │   │   ├── pages/                 # Page components
│   │   │   ├── context/               # React Context (Auth)
│   │   │   └── utils/                 # Utility functions
│   │   ├── package.json
│   │   └── vite.config.js
│   └── pom.xml                        # Maven configuration
├── images/                            # Product images
├── setup-database.sql                 # Database setup script
└── README.md                          # This file
```

## 🚀 Getting Started

### Prerequisites

Before running this application, ensure you have the following installed:

- **Java Development Kit (JDK) 17+**
  - [Download JDK](https://www.oracle.com/java/technologies/downloads/)
  - Verify: `java -version`

- **Maven** (or use included Maven wrapper)
  - [Download Maven](https://maven.apache.org/download.cgi)
  - Verify: `mvn -version`

- **Node.js 18+** and **npm**
  - [Download Node.js](https://nodejs.org/)
  - Verify: `node -v` and `npm -v`

- **MySQL 8+**
  - [Download MySQL](https://dev.mysql.com/downloads/mysql/)
  - Verify: `mysql --version`

### 📦 Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/swarnasharma123/ShopSphere-Ecommerce-System.git
cd ShopSphere-Ecommerce-System
```

#### 2. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE IF NOT EXISTS ecommerce;
```

Or run the provided SQL script:

```bash
mysql -u root -p < setup-database.sql
```

#### 3. Backend Configuration

Navigate to `sb-ecom1/src/main/resources/application.properties` and update:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

# JWT Secret (Change this for production!)
spring.app.jwtSecret=YOUR_SECRET_KEY_HERE

# Email Configuration (for password reset OTP)
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_EMAIL_APP_PASSWORD
```

Or use environment variables (recommended for production):
- `SPRING_MAIL_USERNAME`
- `SPRING_MAIL_PASSWORD`

#### 4. Run the Backend

```bash
cd sb-ecom1

# Using Maven wrapper (Windows)
mvnw.cmd spring-boot:run

# Using Maven wrapper (Mac/Linux)
./mvnw spring-boot:run

# Or using Maven directly
mvn spring-boot:run
```

Backend will start at: **http://localhost:9999**

#### 5. Run the Frontend

Open a new terminal:

```bash
cd sb-ecom1/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start at: **http://localhost:5173**

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file or set environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `SPRING_MAIL_HOST` | SMTP server host | smtp.gmail.com |
| `SPRING_MAIL_PORT` | SMTP server port | 587 |
| `SPRING_MAIL_USERNAME` | Email for sending OTPs | - |
| `SPRING_MAIL_PASSWORD` | Email app password | - |

### Frontend API Configuration

The frontend API base URL is configured in `frontend/src/api/client.js`:

```javascript
const API_BASE_URL = 'http://localhost:9999/api';
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | User login (returns JWT) |
| POST | `/api/auth/signout` | User logout |
| POST | `/api/auth/forgot-password` | Request password reset OTP |
| POST | `/api/auth/reset-password` | Reset password with OTP |
| GET | `/api/auth/user` | Get current user info |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/products` | Get all products (paginated) |
| GET | `/api/public/products/{id}` | Get product by ID |
| GET | `/api/public/categories/{categoryId}/products` | Get products by category |
| POST | `/api/admin/categories/{categoryId}/product` | Add product (Admin) |
| PUT | `/api/admin/products/{productId}` | Update product (Admin) |
| DELETE | `/api/admin/products/{productId}` | Delete product (Admin) |

### Cart Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/carts` | Get user's cart |
| POST | `/api/carts/products/{productId}/quantity/{quantity}` | Add to cart |
| PUT | `/api/carts/products/{productId}/quantity/{quantity}` | Update cart item |
| DELETE | `/api/carts/{cartId}/product/{productId}` | Remove from cart |

### Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user's orders |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/{orderId}` | Get order details |

### Category Endpoints (Admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/categories` | Get all categories |
| POST | `/api/admin/categories` | Create category |
| PUT | `/api/admin/categories/{categoryId}` | Update category |
| DELETE | `/api/admin/categories/{categoryId}` | Delete category |

For detailed API documentation with request/response examples, see [API.md](API.md)

## 🏗️ Build for Production

### Backend

```bash
cd sb-ecom1
mvn clean package

# Run the JAR file
java -jar target/sb-ecom1-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd sb-ecom1/frontend
npm run build

# The build output will be in the 'dist' folder
```

## 🐳 Docker Deployment

Docker configuration files are included for easy deployment:

```bash
docker-compose up -d
```

See [docker-compose.yml](docker-compose.yml) for details.

## 🔐 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Encryption:** BCrypt password hashing
- **Role-Based Access Control:** Admin and User roles
- **CORS Configuration:** Configured for frontend-backend communication
- **OTP Email Verification:** Secure password reset flow

## 🧪 Testing

### Run Backend Tests

```bash
cd sb-ecom1
mvn test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Swarna Sharma**

- GitHub: [@swarnasharma123](https://github.com/swarnasharma123)

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- MySQL Documentation

## 📧 Support

For support, email or open an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filters
- [ ] Order tracking with status updates
- [ ] Email notifications
- [ ] Admin analytics dashboard
- [ ] Multi-language support

---

⭐ If you find this project useful, please consider giving it a star on GitHub!

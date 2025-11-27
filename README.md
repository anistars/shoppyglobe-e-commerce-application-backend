# ShoppyGlobe E-Commerce API
# ShoppyGlobe E-Commerce API

A RESTful API for a simple e-commerce application built using Node.js, Express, and MongoDB. This project supports user registration/login, product management, and a shopping cart with JWT-based authentication.

---

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Setup Instructions](#setup-instructions)  
- [API Endpoints](#api-endpoints)  
- [Validation & Authentication](#validation--authentication)  
- [Notes](#notes)

---

## Features

- User registration and login with JWT authentication
![Register](screenshots/Screenshot%202025-11-27%20140739.png)

- Password hashing with bcrypt
![Hashing of password](screenshots/image.png)
Hashing of password

- Product Get all products and product by id operations
![All products](screenshots/Screenshot%202025-11-27%20135834.png)
![All products](screenshots/image-1.png)
![Product by id](screenshots/Screenshot%202025-11-27%20135903.png)

- Shopping cart CRUD operations (Add, Update, Remove, Get Cart Items)
![Add to Cart](screenshots/Screenshot%202025-11-27%20135720.png)
Add to cart
![Add to cart mongoDB](screenshots/image-2.png)
Add to cart mongoDB

![Cart for specific user logged in](screenshots/Screenshot%202025-11-27%20135733.png)
Cart for specific user logged in

![Edit cart](screenshots/Screenshot%202025-11-27%20135754.png)
Edit cart item

![Delete cart item](screenshots/Screenshot%202025-11-27%20135811.png)
Delete cart item

- Input validation and error handling
![Vaildations](screenshots/Screenshot%202025-11-27%20135600.png)

- Logging of requests (HTTP method, URL, status code)
![Login](screenshots/Screenshot%202025-11-27%20135620.png)
---

## Technologies Used

- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT (JSON Web Token) for authentication  
- bcryptjs for password hashing  
- Postman or ThunderClient for API testing

---

## Setup Instructions

1. **Clone the repository**:
```bash
git clone https://github.com/anistars/shoppyglobe-e-commerce-application-backend.git
cd backend-shoppyglobe-e-commerce
```
2. **Install node modules**:
```bash
node install

```
3. **Run with using nodemon or node "index.js"**


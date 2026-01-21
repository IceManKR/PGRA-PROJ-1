Production Grade REST API
A production-grade REST API built with Node.js and Express, featuring secure authentication, role-based authorization, MongoDB persistence, pagination, structured logging, and rate limiting.

---

##  Features

- JWT-based authentication (login & registration)
- Role-Based Access Control (RBAC)
- Secure password hashing with bcrypt
- MongoDB persistence using Mongoose
- Input validation & sanitization
- Pagination and sorting for scalable data access
- Route-aware rate limiting (auth, read, write)
- Centralized error handling
- Structured logging with Pino
- Environment-based configuration

---

##  Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT
- **Authorization:** Middleware-based RBAC
- **Validation:** express-validator
- **Logging:** Pino + pino-http
- **Rate Limiting:** express-rate-limit

---

##  Project Structure
server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── validators/
├── db/
└── server.js

---

##  Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/PGRA-PROJ-1.git
cd PGRA-PROJ-1
```
### 2. Install dependencies
```bash
npm install
```
### 3. Create .env file
```bash
NODE_ENV=development
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 4. Start the Server
```bash
npm start
```
### 5. Server will run on
```bash
http://localhost:3000
```


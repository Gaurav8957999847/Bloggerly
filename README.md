# Blogging Platform - Backend API

A robust and scalable Node.js/Express-based Blogging Platform API. This backend handles user authentication, post management with image uploads, and role-based access control.

## 🚀 Features

- **User Authentication**: Secure Login and Registration with JWT.
- **Role-Based Access Control**: Different permissions for `admin` and `user`.
- **Post Management**: Full CRUD operations for blog posts.
- **Image Uploads**: Integrated image uploading using Multer.
- **Pagination & Filtering**: Efficiently retrieve posts with pagination and category filtering.
- **Security**: Password hashing with `bcrypt` and protected routes.

---

## 🛠️ Tech Stack

- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Database)
- **JWT** (Authentication)
- **Multer** (File Uploads)
- **CORS** (Cross-Origin Resource Sharing)

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd main
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following variables:
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Running the App
For development (with nodemon):
```bash
npm run dev
```

For production:
```bash
npm start
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get a token |

### Posts
| Method | Endpoint | Middleware | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/posts` | Public | Get all posts (supports `page`, `limit`, `category`) |
| GET | `/api/posts/:id` | Public | Get a single post by ID |
| POST | `/api/posts` | Auth | Create a new post (with image) |
| PUT | `/api/posts/:id` | Auth | Update a post (owner only) |
| DELETE | `/api/posts/:id` | Auth | Delete a post (owner only) |

---

## 📷 File Structure
- `models/`: Mongoose schemas (User, Posts).
- `controllers/`: Logic for auth and post operations.
- `routes/`: API route definitions.
- `middlewares/`: Authentication and image upload logic.
- `uploads/`: Directory for storing post images.

---

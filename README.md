<div align="center">

# 🌟 BLOGGERLY CORE 🌟
### *The Ultimate Engine for Modern Publishing*

[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

**Bloggerly** is a high-performance, developer-first backend API. Crafted with precision, it's designed to be the backbone of sophisticated blogging platforms, delivering power, security, and elegance in every request.

[Explore Endpoints](#-api-documentation) • [Setup Guide](#-getting-started) • [Technical Architecture](#-the-engine-room)

</div>

---

## 💎 Premium Features

> [!TIP]
> **Refined Auth Experience:** Your users can now log in using either their **Email** or **Username**. No more "forgot which one I used" friction.

- **🛡️ Shielded Authentication**: Multi-layered security using `Bcrypt` for zero-knowledge password storage and `JWT` for stateless, high-speed authorization.
- **🖼️ Smart Media Pipeline**: Optimized image processing via `Multer`, restricted to specific mime-types and size limits to keep your server lean.
- **⚡ Reactive Data Engine**: Built on `Mongoose`, featuring automated timestamps, field validation, and relational population for rich data responses.
- **🚦 Role-Based Traffic Control**: Built-in middleware to differentiate between **Standard Users** and **System Admins**.
- **🔍 Smart Filtering**: Native support for category-based discovery and limit-based pagination.

---

## 🏗️ Project Blueprint

A carefully architected directory structure ensures that **Bloggerly** remains maintainable as your platform scales.

```bash
📦 Bloggerly-Core
 ┣ 📂 controllers       # 🧠 The Brain: Business logic for every action
 ┃ ┣ 📜 authControllers.js
 ┃ ┗ 📜 postController.js
 ┣ 📂 middlewares       # 🛡️ The Shield: Security, Uploads, and Validation
 ┃ ┣ 📜 authMiddleware.js
 ┃ ┣ 📜 roleMiddleware.js
 ┃ ┣ 📜 upload.js       # Case-sensitive production ready
 ┃ ┗ 📜 validator.js
 ┣ 📂 models            # 📊 The Skeleton: Database Schemas (User & Post)
 ┣ 📂 routes            # 🗺️ The Map: URL routing to logic
 ┣ 📂 uploads           # 🖼️ The Vault: Content assets storage
 ┣ 📜 server.js         # 🚀 The Reactor: Main entry point
 ┗ 📜 .env              # 🔐 Key Locker: Secrets & Configuration
```

---

## 📡 API Documentation

### 🔓 Public Access & Authentication
| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user profile | 🆕 |
| `POST` | `/api/auth/login` | Secure JWT Session generation | 🔑 |
| `GET` | `/api/posts` | Explore posts with search & pagination | 🌎 |
| `GET` | `/api/posts/:id` | Read a deep-dive post detail | 🌎 |

### 🔒 Private Author Actions
| Method | Endpoint | Requirements | Action |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/posts` | `Auth` + `Form-Data` | Publish a new story |
| `PUT` | `/api/posts/:id` | `Owner` / `Admin` | Refine existing content |
| `DELETE`| `/api/posts/:id` | `Owner` / `Admin` | Remove content permanently |

---

## 🛠️ The Engine Room (Technical Highlights)

### 🩺 Centralized Error Management
Bloggerly features a **Standardized Error Engine**. Instead of messy server stacks, the API returns elegant, machine-readable JSON for every failure:
- **`CastError`**: Gracefully handles invalid IDs with a `404`.
- **`ValidationError`**: Maps Mongoose schema violations to a readable array for the frontend.
- **`DuplicateKey`**: Detects existing usernames/emails before they reach the DB.

### 🖼️ Asset Validation Logic
We don't just "upload files". We validate them.
- **Mime Restriction**: Only `jpg`, `png`, and `webp` are allowed.
- **Hard Limits**: `5MB` cap prevents storage bloat.
- **Timestamp Salting**: Filenames are salted with `Date.now()` to prevent browser caching issues and collisions.

---

## 🏁 Getting Started

### 🚦 Prerequisites
- **Node.js** v18+
- **MongoDB** (Atlas Recommended)

### ⚙️ Quick Setup
1. **Clone & Install:**
   ```bash
   git clone <repo_url> && cd main && npm install
   ```
2. **Configure Secrets:**
   Create a `.env` file from the example below:
   ```env
   PORT=5000
   MONGO_URL=mongodb_srv_link
   JWT_SECRET=generate_something_strong
   NODE_ENV=development
   ```
3. **Ignition:**
   ```bash
   npm run dev
   ```

---

<div align="center">
Made with 🚀 by Gaurav | <b>Bloggerly Core v1.1</b>
</div>

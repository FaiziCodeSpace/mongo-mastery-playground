## 🚀 Mongo Mastery Playground

A focused Node.js + Express.js project designed to master Mongoose & MongoDB essentials. Built with modular architecture and progressive enhancements.

---

### 📁 Features Implemented

- ✅ Express server setup with MongoDB connection
- ✅ RESTful API for Students (CRUD)
- ✅ Mongoose Schema with validation
- ✅ Advanced Querying:
  - Filtering (`?major=Science`)
  - Sorting (`?sort=age`)
  - Pagination (`?page=1&limit=5`)
- ✅ Mongoose Middleware:
  - `pre("save")` – Capitalize student names before saving
- ✅ Query Helpers:
  - `.byMajor()` – Filter students by major
  - `.byAge()` – Filter students by age
- ✅ Mongoose Virtuals:
  - `fullName` – Combines firstName and lastName
  - `age` – Calculates age from DOB

---

### 📂 Project Structure
```
├── config/
│   └── db.js
├── models/
│   └── Student.js
├── routes/
│   └── studentRoutes.js
├── controllers/
│   └── studentController.js
├── .env
├── server.js
```

---

### 🧪 How to Run

```bash
git clone https://github.com/your-username/mongo-mastery-playground.git
cd mongo-mastery-playground
npm install
npm run dev
```

Make sure to create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
```

---

### 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv

---

### 🎯 Goal
To become confident in real-world Mongoose workflows – from basic schemas to middleware and complex queries.

---

### 📌 Next Up
- `pre("find")` middleware
- `post("save")` & error handling
- Authentication, soft deletes & more!

---

### ⚡ Author
**Faizan** – MERN Stack Developer

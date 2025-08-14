## 🚀 Mongo Mastery Playground

A focused Node.js + Express.js project designed to master Mongoose & MongoDB essentials. Built with modular architecture and progressive enhancements.

---

### 📁 Features Implemented

- ✅ Express server setup with MongoDB connection
- ✅ RESTful API for Students (CRUD)
- ✅ Mongoose Schema with validation
- ✅ Mongoose Schema Options:
  - `timestamps: true` – Auto-manage createdAt & updatedAt
  - `versionKey: false` – Removes `__v` field from documents
  - `toJSON` and `toObject` – Includes virtuals in output
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
  - `fullName` – Combines name and lastName
  - `age` – Calculates age from DOB
- ✅ Mongoose Indexes:
  - Unique index on `name`
  - Compound index on `major` and `age`
- ✅ Auto-populate and Post-save action
- ✅ Schema-level Error Handling (duplicates & validation)
- ✅ add roll number generation post-save
- ✅ Add pre(find) middleware to exclude inactive students from queries
- ✅ Aggregation

---

### 🧪 How to Run

```bash
git clone https://github.com/your-username/mongo-mastery-playground.git
cd mongo-mastery-playground
npm install
npm run dev
```

Create a `.env` file in the root directory:

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

# Fixing Mongoose Transaction Hang with Replica Set

While implementing a assignTeacherWithStudent transaction in MongoDB (Replica Set mode), I ran into an issue where the API kept loading and the transaction would eventually abort.

# Issue

The transaction was hanging because of how MongoDB handles writeConcern in replica sets. By default, it waits for w: "majority", which caused delays in my local setup.

# What I Tried
- Verified replica set status with rs.status() → all members were healthy and in sync.
- Checked connection string — made sure it included all nodes and ?replicaSet=rs0.
- Confirmed session handling in all queries inside withTransaction.
- Restarted the replica set and re-inserted fresh data



### ⚡ Author
**Faizan** – MERN Stack Developer

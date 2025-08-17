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
  - `pre("find")` – Exclude inactive students from queries
  - `pre("findOneAndDelete")` – Decrement teacher’s student count on student deletion
- ✅ Query Helpers:
  - `.byMajor()` – Filter students by major
  - `.byAge()` – Filter students by age
- ✅ Mongoose Virtuals:
  - `fullName` – Combines name and lastName
  - `age` – Calculates age from DOB
- ✅ Mongoose Indexes:
  - Unique index on `name`
  - Compound index on `major` and `age`
- ✅ Auto-populate teacher reference on student queries
- ✅ Post-save actions:
  - Roll number generation
  - Trigger related updates
- ✅ Schema-level Error Handling (duplicates & validation)
- ✅ Aggregation pipelines for reporting
- ✅ Transactions (assign teacher ↔ student with rollback on error)
- ✅ Subdocuments & Nested Schemas (e.g., Address inside Student)
- ✅ Repo workflow:
  - Branching strategy
  - Detailed commit messages & PR templates
- ✅ Change Stream

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
To become confident in real-world Mongoose workflows – from basic schemas to middleware, transactions, and complex queries.

---

### ⚡ Author
**Faizan** – MERN Stack Developer

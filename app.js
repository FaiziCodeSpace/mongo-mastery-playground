import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRouter from "./routes/studentRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";

const PORT = process.env.PORT;
connectDB();
const app = express();
dotenv.config();
app.use(express.json());

app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);

// Aggregation
// const totalStudents = await Student.aggregate([
//   {
//     $group: {
//       _id: "$major",
//       totalStudents: {$sum: 1}
//     }
//   }
// ])
// const averageAge = await Student.aggregate([
//   {
//     $addFields: {
//       age: {
//         $dateDiff: {
//           startDate: "$dob",
//           endDate: "$$NOW",
//           unit: "year",
//         },
//       },
//     },
//   },
//   {
//     $group: {
//       _id: "$major",
//       averageAge: { $avg: "$age" },
//       totalStudents: { $sum: 1 },
//     },
//   },
// ]);

// const studentWithTeacher = await Student.aggregate([
//   {$match: {active: true}},
//   {
//     $lookup: {
//       from: "teachers",
//       localField: "teacher",
//       foreignField: "_Id",
//       as: "teacherInfo"
//     }
//   },
//   { $unwind: "$teacherInfo" },
//   { $project: { name: 1, "teacherInfo.name": 1 } }
// ])

// const recentStudents = await Student.aggregate([
//   { $sort: { enrolledAt: -1 } },
//   { $limit: 5 },
//   { $project: { name: 1, lastName: 1, enrolledAt: 1 } }
// ]);
// console.log(recentStudents);
// console.log(averageAge);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

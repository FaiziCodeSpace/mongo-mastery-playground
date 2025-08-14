import mongoose from "mongoose";    
import Student from "../models/Student.js";    
import Teacher from "../models/Teacher.js";

export const assignTeacherWithStudent = async (req, res) => {
  const { studentId, teacherId } = req.body;
  const session = await mongoose.startSession();
  let resultMessage = "";

  console.log("📥 Incoming request body:", req.body);

  try {
    await session.withTransaction(async () => {
      console.log("🔹 Transaction started");

      // Step 1: Find student
      console.log("🔍 Finding student:", studentId);
      const student = await Student.findById(studentId).session(session);
      if (!student) throw new Error("Student does not exist!");
      console.log("✅ Student found:", student.name);

      // Step 2: Find teacher
      console.log("🔍 Finding teacher:", teacherId);
      const teacher = await Teacher.findById(teacherId).session(session);
      if (!teacher) throw new Error("Teacher does not exist!");
      console.log("✅ Teacher found:", teacher.name);

      // Step 3: Assign teacher to student
      console.log("📝 Assigning teacher to student...");
      student.teacher = teacher._id;
      await student.save({ session });
      console.log("✅ Student updated");

      // Step 4: Add student to teacher's list if not already assigned
      console.log("🔍 Checking if student already in teacher's list...");
      const alreadyAssigned = teacher.students.some(id => id.equals(student._id));
      console.log("Already assigned?", alreadyAssigned);

      if (!alreadyAssigned) {
        console.log("➕ Adding student to teacher...");
        teacher.students.push(student._id);
        teacher.studentCount += 1;
        await teacher.save({ session });
        console.log("✅ Teacher updated");
      }

      resultMessage = "Teacher assigned to student successfully!";
      console.log("🎯 Transaction finished successfully");
    });

    res.status(200).json({ message: resultMessage });
  } catch (error) {
    console.error("❌ Transaction error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    await session.endSession();
    console.log("🔹 Session ended");
  }
};

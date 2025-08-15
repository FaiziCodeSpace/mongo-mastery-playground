// controllers/assignTeacher.js
import mongoose from "mongoose";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

export const assignTeacherWithStudent = async (req, res) => {
  const session = await mongoose.startSession();
  const { studentId, teacherId } = req.body;

  console.log("📥 Incoming request body:", req.body);

  try {
    if (!studentId || !teacherId) {
      return res.status(400).json({ ok: false, message: "studentId and teacherId are required" });
    }

    console.log("🔹 Transaction started");
    let result = null;

    await session.withTransaction(
      async () => {
        console.log("🔍 Finding student:", studentId);
        const student = await Student.findById(studentId).session(session);
        if (!student) throw new Error("Student not found");
        console.log("✅ Student found:", student.name ?? student._id.toString());

        console.log("🔍 Finding teacher:", teacherId);
        const teacher = await Teacher.findById(teacherId).session(session);
        if (!teacher) throw new Error("Teacher not found");
        console.log("✅ Teacher found:", teacher.name ?? teacher._id.toString());

        console.log("📝 Assigning teacher to student...");

        // 1) set the student's teacher
        student.teacher = teacher._id;
        console.log("➡️  Saving student...");
        await student.save({ session, validateModifiedOnly: true });
        console.log("✅ Student saved");

        // 2) add the student to teacher.students (use $addToSet to avoid dupes)
        console.log("➡️  Updating teacher...");
        await Teacher.updateOne(
          { _id: teacher._id },
          { $addToSet: { students: student._id } },
          { session, runValidators: true }
        );
        console.log("✅ Teacher updated");

        result = { student: student._id, teacher: teacher._id };
      },
      {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
      }
    );

    console.log("✅ Transaction committed");
    return res.status(200).json({ ok: true, message: "Teacher assigned", data: result });
  } catch (err) {
    console.error("❌ Transaction failed:", err);
    // If withTransaction threw, the transaction is already aborted; this is a safe extra guard:
    try { await session.abortTransaction(); } catch (_) {}
    return res.status(500).json({ ok: false, message: err.message });
  } finally {
    session.endSession();
    console.log("🔚 Session ended");
  }
};

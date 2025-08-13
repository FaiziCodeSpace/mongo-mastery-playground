import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentCount: { type: Number, default: 0 },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    }
  ], 
}, {
  timestamps: true,
  versionKey: false
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
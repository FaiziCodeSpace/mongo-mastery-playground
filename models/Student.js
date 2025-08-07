import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name should be more than 3 characters"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [5, "Too Young"],
    max: [100, "Too Old"],
  },
  major: {
    type: String,
    required: [true, "Major is required"],
    default: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  department: String,
});

// middleware
studentSchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  next();
});

// Query Helper
studentSchema.query.byMajor = function (major) {
  return this.where({ major: new RegExp(`^${major}$`, 'i') }); // case-insensitive match
};

studentSchema.query.byAge = function (age) {
  return this.where({ age: age });
};

const Student = mongoose.model("Student", studentSchema);

export default Student;

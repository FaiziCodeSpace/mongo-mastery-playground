import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name should be more than 3 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name should be more than 3 characters"],
    trim: true,
  },
  dot: {
    type: Date,
    required: [true, "Must Enter Date of Birthday"],
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

studentSchema.virtual('fullname').get(function(){
    return `${this.name} ${this.lastName}`
})

studentSchema.virtual('age').get(function(){
    if(!this.dot) return null;
    const today = new Date();
    const birthdate = new Date(this.dob);
    const age = today.getFullYear() - birthdate.getFullYear();

    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if ( monthDiff < 0 || ( monthDiff === 0 || dayDiff < 0 )){
        age--;
    }
    return age;
});

studentSchema.set('toJSON', { virtuals: true });
studentSchema.set('toObject', { virtuals: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;

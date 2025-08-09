import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
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
    dob : {
      type: Date,
      required: [true, "Must Enter Date of Birthday"],
    },
    major: {
      type: String,
      required: [true, "Major is required"],
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
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: true,
    toObject: true,
    strict: "throw",
  }
);

// middleware

// SAVE
studentSchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  next();
});
// FIND 
studentSchema.pre(/^find/, function(next){
  this.populate({path: 'teacher', select: 'name'});
  next();
})
// POST
studentSchema.post('save', function(doc){
  console.log(`Student Saved: ${doc.name}`);
})
// Query Helper
studentSchema.query.byMajor = function (major) {
  return this.where({ major: new RegExp(`^${major}$`, "i") }); // case-insensitive match
};


studentSchema.virtual("fullname").get(function () {
  return `${this.name} ${this.lastName}`;
});

studentSchema.virtual("age").get(function () {
  if (!this.dob) return null;
  const today = new Date();
  const birthdate = new Date(this.dob);
  const age = today.getFullYear() - birthdate.getFullYear();

  const monthDiff = today.getMonth() - birthdate.getMonth();
  const dayDiff = today.getDate() - birthdate.getDate();

  if (monthDiff < 0 || monthDiff === 0 || dayDiff < 0) {
    age--;
  }
  return age;
});


studentSchema.pre

studentSchema.index({name: 1}, { unique: true}); // single
studentSchema.index({major: 1, department: 1}); // Compound

// studentSchema.set('timestamps', true);              
// studentSchema.set('versionKey', false);              
//  studentSchema.set('toJSON', { virtuals: true });     
// studentSchema.set('toObject', { virtuals: true }); 

const Student = mongoose.model("Student", studentSchema);

export default Student;

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
    active: {
      type: Boolean,
      default: true,
      select: false
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
  this.find({inactive: {$ne: false}}).populate({path: 'teacher', select: 'name'});
  next();
})
// POST
studentSchema.post('save', async function(doc){
  try {
    const preFix = 'STU';
    const id = String(doc._id);
    const paddedId = String(id).slice(-5).toUpperCase();
    doc.rollNumber = `${preFix}-${paddedId}`;
    await doc.constructor.findByIdAndUpdate(id, {rollNumber: rollNumber})
  } catch (error) {
    console.log(error);
  }
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




studentSchema.index({name: 1}, { unique: true}); // single
studentSchema.index({major: 1, department: 1}); // Compound


// studentSchema.set('timestamps', true);              
// studentSchema.set('versionKey', false);              
//  studentSchema.set('toJSON', { virtuals: true });     
// studentSchema.set('toObject', { virtuals: true }); 


// Error Handling
// This catches errors triggered by document middleware like save()
studentSchema.post('save', function (error, doc, next) {
  if (error && error.name === 'MongoServerError' && error.code === 11000) {
    // duplicate key (E11000)
    return next(new Error(`Duplicate value for field(s): ${JSON.stringify(error.keyValue)}`));
  }
  if (error && error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(e => e.message);
    return next(new Error(messages.join(', ')));
  }
  next(error);
});


const Student = mongoose.model("Student", studentSchema);

export default Student;

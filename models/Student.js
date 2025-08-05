import mongoose from "mongoose";

const studentSchema = new mongoose .Schema({
    name: {
        type:String,
        required: [true, "Name is required"],
        minlength: [3, "Name should be more than 3 characters"],
        trim: true,
    },
    age: {
        type:Number,
        required:[true, "Age is required"],
        min: [5, "Too Young"],
        max: [100, "Too Old"],
    },
    major: {
        type: String,
        required: [true, "Major is required"],
        enum: ["CS", "MATH", "PHYSICS", "CHEMISTRY", "English"],
        default: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Student', studentSchema);
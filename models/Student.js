import mongoose from "mongoose";

const studentSchema = new mongoose .Schema({
    name: String,
    age: Number,
    major: String,
});

export default mongoose.model('students', studentSchema);
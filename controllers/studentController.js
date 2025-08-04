import Student from "../models/Student.js";

export const getStudents = async (req, res)=>{
    const students = await Student.find();
    res.json(students);
}

export const postStudent = async (req, res)=>{
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
} 

export const updateStudent = async (req, res)=>{
    const {id} = req.params;
    const newStudent = await Student.findByIdAndUpdate(id, req.body, {new: true});
    res.json(newStudent);
}

export const deleteStudent = async (req, res)=>{
    const {id} = req.params;
    await Student.findByIdAndDelete(id);
    res.json({message: 'Student Deleted!'});
}

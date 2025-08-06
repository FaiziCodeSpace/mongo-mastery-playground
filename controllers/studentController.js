import Student from "../models/Student.js";

export const getStudents = async (req, res) => {
  try {
    const { major, age, sort, page = 1, limit = 5 } = req.query;
    const query = {};

    if (major) query.major = major;
    if (age) query.age = Number(age);

    const skip = (page - 1) * limit;

    let studentsQuery = Student.find(query).skip(skip).limit(Number(limit));

    if (sort) {
      studentsQuery = studentsQuery.sort(sort);
    }

    const students = await studentsQuery;

    res.json(students);
  } catch (error) {
    console.log(error);
  }
};

export const postStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const newStudent = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(newStudent);
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.json({ message: "Student Deleted!" });
};

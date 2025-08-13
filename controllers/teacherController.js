import Teacher from "../models/Teacher.js";

// GET all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("students", "name lastName major");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new teacher
export const postTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE teacher
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("students", "name lastName major");

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

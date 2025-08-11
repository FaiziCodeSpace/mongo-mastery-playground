import { Router } from "express";
import {
  deleteStudent,
  getStudents,
  postStudent,
  updateStudent,
} from "../controllers/studentController.js";
import Student from "../models/Student.js";
const router = Router();

router.get("/", getStudents);
router.post("/", postStudent);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);

router.get("/:major", async (req, res) => {
  try {
    const { major } = req.params;
    const student = await Student.find().byMajor(major);
    res.json(student);
  } catch (err) {
    console.log(err);
  }
});

export default router;

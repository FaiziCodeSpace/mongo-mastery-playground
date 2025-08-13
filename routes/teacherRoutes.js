import { Router } from "express";
import {
  getTeachers,
  postTeacher,
  updateTeacher,
  deleteTeacher
} from "../controllers/teacherController.js";

const router = Router();

router.get("/", getTeachers);
router.post("/", postTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;

// routes/assignRouter.js
import { Router } from "express";
import { assignTeacherWithStudent } from "../controllers/assignTeacher.js";

const router = Router();
router.put("/", assignTeacherWithStudent);

export default router;

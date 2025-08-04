import { Router } from "express";
import { deleteStudent, getStudents, postStudent, updateStudent } from "../controllers/studentController.js";
const router = Router();

router.get('/', getStudents);
router.post('/', postStudent);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);

export default router;
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  createCourse,
  getCourses,
  getCoursesByTeacher,
  deleteCourse,
  enrollStudent,
  getEnrolledCourses 
} from "../controllers/courseController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
const router = express.Router();
router.post("/", upload.single("video"), createCourse);
router.get("/", getCourses);
router.get("/teacher/:teacherId", getCoursesByTeacher);
router.delete("/:courseId", deleteCourse);

router.post("/:courseId/enroll", enrollStudent);           
router.get("/enrollments/:studentId", getEnrolledCourses); 

export default router;

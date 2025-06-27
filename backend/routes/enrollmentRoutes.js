import express from "express";
import { enrollInCourse, getEnrolledCourses } from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/", enrollInCourse); 
router.get("/:studentId", getEnrolledCourses); 

export default router;

import { Course } from "../models/courseModel.js";
import { Enrollment } from "../models/enrollmentModel.js";
export const enrollInCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const already = await Enrollment.findOne({ student: studentId, course: courseId });
    if (already) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({ student: studentId, course: courseId });
    res.status(201).json(enrollment);
  } catch (err) {
    console.error("Enroll error:", err);
    res.status(500).json({ message: "Failed to enroll" });
  }
};
export const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const enrollments = await Enrollment.find({ student: studentId }).populate("course");
    const courses = enrollments.map((e) => e.course);
    res.json(courses);
  } catch (err) {
    console.error("Fetch enrollments error:", err);
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
};

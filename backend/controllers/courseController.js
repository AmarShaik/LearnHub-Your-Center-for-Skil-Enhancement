import mongoose from "mongoose";
import { Course } from "../models/courseModel.js";
export const createCourse = async (req, res) => {
  try {
    const { title, description, price, teacherId } = req.body;
    const videoPath = req.file ? req.file.path : null;

    if (!title || !description || !teacherId || !videoPath) {
      return res.status(400).json({ message: "All fields including video are required" });
    }

    const coursePrice = price === undefined || price === "" ? 0 : Number(price);

    const newCourse = await Course.create({
      title,
      description,
      price: coursePrice,
      videoUrl: videoPath,
      teacher: teacherId,
      enrolledStudents: []
    });

    res.status(201).json(newCourse);
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCoursesByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const courses = await Course.find({ teacher: new mongoose.Types.ObjectId(teacherId) });

    // Include enrolled count for each course
    const updated = courses.map((course) => ({
      ...course.toObject(),
      enrolledCount: course.enrolledStudents?.length || 0,
    }));

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.courseId);
    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const enrollStudent = async (req, res) => {
  const { courseId } = req.params;
  const { studentId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    course.enrolledStudents.push(studentId);
    await course.save();

    res.json({ message: "Enrollment successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  const { studentId } = req.params;

  try {
    const courses = await Course.find({ enrolledStudents: studentId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

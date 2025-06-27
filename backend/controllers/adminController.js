import { Course } from "../models/courseModel.js";
import { Enrollment } from "../models/enrollmentModel.js";
import { User } from "../models/userModel.js";

export const getAdminStats = async (req, res) => {
  try {
    const students = await User.countDocuments({ type: "student" });
    const teachers = await User.countDocuments({ type: "teacher" });
    const courses = await Course.find().populate("teacher", "name").lean();
    const enrollments = await Enrollment.find().populate("course");

    const revenue = enrollments.reduce((total, e) => {
      const price = e.course?.price || 0;
      return total + price;
    }, 0);

    const courseDetails = await Promise.all(
      courses.map(async (course) => {
        const count = await Enrollment.countDocuments({ course: course._id });
        return {
          title: course.title,
          teacherName: course.teacher?.name || "Unknown",
          price: course.price,
          enrolledCount: count,
        };
      })
    );

    res.json({ students, teachers, totalCourses: courses.length, revenue, courseDetails });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

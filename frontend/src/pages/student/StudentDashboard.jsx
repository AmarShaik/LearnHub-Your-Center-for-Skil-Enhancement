import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`/api/enrollments/${user._id}`);
        const cleaned = res.data.filter(Boolean);
        setEnrolledCourses(cleaned);
      } catch (err) {
        console.error("Failed to fetch enrolled courses", err);
      }
    };

    if (user?.type === "student") {
      fetchEnrolledCourses();
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-700">
            🎓 Hello, {user?.name || "Student"}
          </h2>
        </div>

        <p className="mb-4 text-gray-700">
          Welcome to your student dashboard.
        </p>

        <h3 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
          📚 Enrolled Courses
        </h3>

        {enrolledCourses.length === 0 ? (
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
        ) : (
          <ul className="space-y-4">
            {enrolledCourses.map((course, index) => (
              course && (
                <li
                  key={index}
                  className="border p-4 rounded shadow-sm bg-blue-50"
                >
                  <h4 className="text-lg font-bold text-blue-700">{course.title}</h4>
                  <p className="text-gray-700">{course.description}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {course.price === 0 ? "Free" : `Price: ₹${course.price}`}
                  </p>
                  {course.videoUrl && (
                    <video
                      src={`http://localhost:5000/${course.videoUrl}`}
                      className="mt-2 w-full rounded"
                      controls
                      preload="none"
                    />
                  )}
                </li>
              )
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

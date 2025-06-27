import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "../../utils/axiosInstance";

const TeacherDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`/api/courses/teacher/${userInfo._id}`);
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    if (userInfo?._id) {
      fetchCourses();
    }
  }, [userInfo?._id]);

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/courses/${courseId}`);
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      alert("✅ Course deleted");
    } catch (err) {
      console.error("Failed to delete course:", err);
      alert("❌ Failed to delete course");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          👩‍🏫 Welcome, {userInfo?.name || "Teacher"}
        </h2>
        <p className="mb-4 text-gray-700">
          This is your dashboard. Manage your courses below.
        </p>

        <div className="mb-6">
          <a
            href="/teacher/add-course"
            className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            ➕ Add New Course
          </a>
        </div>

        <h3 className="text-xl font-semibold mb-2">📋 Your Courses:</h3>

        {courses.length === 0 ? (
          <p className="text-gray-600">You haven't added any courses yet.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course._id}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <h4 className="text-lg font-bold text-blue-700">{course.title}</h4>
                <p className="text-gray-700">{course.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  💰 {course.price === 0 ? "Free" : `₹${course.price}`} <br />
                  📺 Video: {course.videoUrl ? "Uploaded" : "Not uploaded"}
                </p>

                {course.videoUrl && (
                  <video
                    src={`http://localhost:5000/${course.videoUrl}`}
                    className="mt-2 w-full rounded"
                    controls
                    preload="none"
                  />
                )}

                <button
                  onClick={() => handleDelete(course._id)}
                  className="mt-2 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;

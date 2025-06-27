import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">📚 Available Courses</h1>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course._id} className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold text-blue-600">{course.title}</h2>
                <p className="text-gray-700 mt-1 mb-2">{course.description}</p>
                <p className="text-gray-800 font-medium">
                  Price: {course.price === 0 ? "Free" : `₹${course.price}`}
                </p>
                <div className="mt-3">
                  {course.videoUrl && (
                    <video controls className="w-full rounded">
                      <source
                        src={`http://localhost:5000/${course.videoUrl.replace(/\\/g, "/")}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

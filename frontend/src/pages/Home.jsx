import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";

export default function Home() {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [filter, setFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        setAllCourses(res.data);
        setFilteredCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredCourses(allCourses);
    } else if (filter === "free") {
      setFilteredCourses(allCourses.filter((course) => course.price === 0));
    } else if (filter === "paid") {
      setFilteredCourses(allCourses.filter((course) => course.price > 0));
    }
  }, [filter, allCourses]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      if (user?.type === "student") {
        try {
          const res = await axios.get(`/api/enrollments/${user._id}`);
          const ids = res.data.map((course) => course?._id).filter(Boolean);
          setEnrolledIds(ids);
        } catch (err) {
          console.error("Failed to fetch enrolled courses", err);
        }
      }
    };
    fetchEnrolled();
  }, [user]);

  const handleEnroll = async (courseId) => {
    if (!user || user?.type !== "student") {
      alert("Please login as a student to enroll.");
      return;
    }

    try {
      await axios.post("/api/enrollments", {
        studentId: user._id,
        courseId: courseId,
      });
      alert("✅ Enrolled successfully!");
      setEnrolledIds((prev) => [...prev, courseId]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to enroll.");
    }
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-[70vh] flex items-center justify-center bg-blue-50 text-center p-6">
        <div className="bg-white bg-opacity-70 p-6 rounded-md">
          <h1 className="text-5xl font-bold text-blue-700 mb-4">Welcome to LearnHub</h1>
          <p className="text-lg text-black mb-6">
            Learn, Grow, and Succeed with our curated courses for every learner.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-10 px-4 pb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-blue-700">📚 All Courses</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-gray-700"
          >
            <option value="all">All Courses</option>
            <option value="free">Free Courses</option>
            <option value="paid">Paid Courses</option>
          </select>
        </div>

        {filteredCourses.length === 0 ? (
          <p>No courses found for selected filter.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div key={course._id} className="bg-white shadow rounded p-4">
                <h3 className="text-xl font-semibold text-blue-600">{course.title}</h3>
                <p className="text-gray-700 mt-1 mb-2">{course.description}</p>
                <p className="text-gray-800 font-medium">
                  Price: {course.price === 0 ? "Free" : `₹${course.price}`}
                </p>

                {/* ✅ Video preview */}
                {course.videoUrl && (
                  <video
                    src={`http://localhost:5000/${course.videoUrl}`}
                    className="mt-3 w-full rounded"
                    controls
                    preload="none"
                  />
                )}

                {user?.type === "student" &&
                  (enrolledIds.includes(course._id) ? (
                    <button
                      disabled
                      className="mt-3 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                    >
                      Enrolled
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Enroll
                    </button>
                  ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

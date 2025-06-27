import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";

const AddCourse = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !video) {
      return setMessage("❌ All fields are required.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("video", video);
    formData.append("teacherId", userInfo._id);

    try {
      const res = await axios.post("/api/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Course added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setVideo(null);
    } catch (err) {
      setMessage("❌ Failed to add course.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">📚 Add a New Course</h2>

        {message && <p className="mb-4 text-red-600 font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Course Title</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full border px-4 py-2 rounded"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500 mt-1">Enter ₹0 for a free course.</p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Video</label>
            <label className="cursor-pointer flex items-center gap-2 border border-dashed border-gray-400 rounded p-3 hover:bg-gray-50">
              <span className="text-gray-600">📁 Choose a video file</span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className="hidden"
                required
              />
            </label>
            {video && (
              <p className="text-sm mt-2 text-green-600">Selected: {video.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/api/users/register", formData);

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      console.log("❌ Registration error:", err);
      alert("❌ " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-3 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          className="w-full p-2 mb-4 border rounded"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = user?.token;
        const res = await axios.get("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      }
    };

    if (user?.isAdmin) {
      fetchStats();
    }
  }, [user]);

  if (!user?.isAdmin) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-10">❌ You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">🛠 Admin Dashboard</h2>
        {stats ? (
          <div className="grid grid-cols-2 gap-6 text-lg text-gray-800">
            <div className="bg-blue-50 p-4 rounded shadow">
              👨‍🎓 Students: <strong>{stats.students}</strong>
            </div>
            <div className="bg-green-50 p-4 rounded shadow">
              👩‍🏫 Teachers: <strong>{stats.teachers}</strong>
            </div>
            <div className="bg-yellow-50 p-4 rounded shadow">
              📚 Total Courses: <strong>{stats.courses}</strong>
            </div>
            <div className="bg-pink-50 p-4 rounded shadow">
              💰 Revenue: <strong>₹{stats.revenue}</strong>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Loading statistics...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

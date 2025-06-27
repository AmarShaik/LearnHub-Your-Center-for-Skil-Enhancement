import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import AddCourse from "./pages/teacher/AddCourse";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/AdminDashboard"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/add-course" element={<AddCourse />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* ✅ Admin route */}

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

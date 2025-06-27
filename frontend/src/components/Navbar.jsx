import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/");
  };

  const goToDashboard = () => {
    if (userInfo?.type === "teacher") {
      navigate("/teacher/dashboard");
    } else if (userInfo?.type === "student") {
      navigate("/student/dashboard");
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LearnHub
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>

          {!userInfo ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            </>
          ) : (
            <>
              <button onClick={goToDashboard} className="text-gray-700 hover:text-blue-600">
                Dashboard
              </button>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>

          {!userInfo ? (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="block text-gray-700 hover:text-blue-600">Register</Link>
            </>
          ) : (
            <>
              <button onClick={goToDashboard} className="block text-gray-700 hover:text-blue-600">
                Dashboard
              </button>
              <button onClick={handleLogout} className="block text-red-600 hover:text-red-800">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

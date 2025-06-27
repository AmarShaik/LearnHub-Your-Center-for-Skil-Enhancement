import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.type === "teacher") {
      navigate("/teacher/dashboard");
    } else if (userInfo?.type === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p className="text-center mt-10">Redirecting...</p>;
};

export default HomeRedirect;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>🏏 Live Cricket Score</h1>
      <p>Select your role</p>

      <div className="home-options">

        {/* USER SECTION */}
        <div className="home-card">
          <h2>User</h2>
          <p>View live scores and match details</p>
          <button onClick={() => navigate("/login")}>
            Continue as User
          </button>
        </div>

        {/* ADMIN SECTION */}
        <div className="home-card admin">
          <h2>Admin</h2>
          <p>Manage matches and live scores</p>
          <button onClick={() => navigate("/admin/login")}>
            Admin Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;


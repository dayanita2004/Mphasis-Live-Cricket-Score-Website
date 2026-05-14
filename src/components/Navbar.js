import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // clear auth if any
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <h2 onClick={() => navigate("/score")}>🏏 LiveScore</h2>
      </div>

      <div className="nav-center">
        <span onClick={() => navigate("/score")}>Live Score</span>
        <span onClick={() => navigate("/points-table")}>Points-Table</span>
        <span onClick={() => navigate("/schedule")}>Schedule</span>
        <span onClick={() => navigate("/teams")}>Teams</span>
        <span onClick={() => navigate("/news")}>News</span>  {/* ✅ ADD */}
      </div>

      <div className="nav-right">
        <div className="profile" onClick={() => setOpen(!open)}>
          👤
        </div>

        {open && (
          <div className="dropdown">
            <p>Username</p>
            <p>Email</p>
            <hr />
            <span onClick={handleLogout}>Logout</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
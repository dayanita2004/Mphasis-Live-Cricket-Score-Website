import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Dashboard from "./Dashboard";
import ManageMatches from "./ManageMatches";
import Teams from "./Teams";
import Players from "./Players";
import AdminPointsTable from "./adminpointstable";
import "../styles/Admin.css";

function AdminLayout() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="admin-layout">
      <AdminSidebar active={active} setActive={setActive} />

      <div className="admin-content">
        {active === "dashboard" && <Dashboard />}
        {active === "matches" && <ManageMatches />}
        {active === "teams" && <Teams />}
        {active === "players" && <Players />}
        {active === "points" && <AdminPointsTable />}
      </div>
    </div>
  );
}

export default AdminLayout;

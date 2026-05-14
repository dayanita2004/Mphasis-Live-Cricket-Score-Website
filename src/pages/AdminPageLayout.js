import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/Admin.css";

function AdminPageLayout() {
  return (
    <div className="admin-page-only">
      {/* ✅ Child admin pages render here */}
      <Outlet />
    </div>
  );
}

export default AdminPageLayout;
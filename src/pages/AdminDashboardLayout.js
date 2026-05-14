// import React from "react";
// import { Outlet } from "react-router-dom";
// import AdminSidebar from "../components/AdminSidebar";
// import "../styles/AdminDashboard.css";

// function AdminDashboardLayout() {
// return (
// <div className="admin-layout">

// <AdminSidebar />

// <div className="admin-content">
// <Outlet />
// </div>

// </div>
// );
// }

// export default AdminDashboardLayout;
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/Admin.css";

function AdminDashboardLayout() {
return (
<div className="admin-layout">
<AdminSidebar/>

<div className="admin-content">
<Outlet/>
</div>

</div>
);
}

export default AdminDashboardLayout;
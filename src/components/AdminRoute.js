import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
}

export default AdminRoute;

import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.role !== "admin") {
        setError("Unauthorized access. Admins only.");
        return;
      }

      localStorage.setItem("adminLoggedIn", "true");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 800);

    } catch (err) {
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className={`admin-card ${error ? "shake" : ""}`}>

        <div className="admin-login-header">
          <div className="shield-icon">
            <FaUserShield />
          </div>
          <h2>Admin Login</h2>
          <p>Secure Control Panel Access</p>
        </div>

        {error && (
          <p className="admin-message error fade-in">
            {error}
          </p>
        )}

        <form onSubmit={handleAdminLogin}>

          <div className="input-group">
            {/* <label>Email</label> */}
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                required
                value={email}
                disabled={loading}
                placeholder=" admin email ID"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            {/* <label>Password</label> */}
            <div className="input-box">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                disabled={loading}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
              </span>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Authenticating..." : "Login as Admin"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Admin.css";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleAdminLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/auth/login",
//         { email, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (res.data.role !== "admin") {
//         setError("Unauthorized access. Admins only.");
//         return;
//       }

//       localStorage.setItem("adminLoggedIn", "true");

//       // ✅ Success animation delay
//       setTimeout(() => {
//         navigate("/admin/dashboard");
//       }, 800);

//     } catch (err) {
//       setError("Invalid admin credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <div className={`admin-card ${error ? "shake" : ""}`}>

//         <h2>🔐 Admin Login</h2>

//         {error && (
//           <p className="admin-message error fade-in">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleAdminLogin}>

//           {/* Email */}
//           <div className="input-group">
//             <input
//               type="email"
//               required
//               value={email}
//               disabled={loading}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label>Email</label>
//           </div>

//           {/* Password */}
//           <div className="input-group password-group">
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               value={password}
//               disabled={loading}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <label>Password</label>

//             <span
//               className="toggle-password"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Authenticating..." : "Login as Admin"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }

// export default AdminLogin;
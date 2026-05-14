import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return false;
    }

    setError("");
    return true;
  }

  function handleLogin(e) {
    e.preventDefault();

    if (!validateForm()) return;

    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,
      })
      .then(() => {
        window.location = "/score";
      })
      .catch(() => {
        alert("Invalid login credentials");
      });
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {/* ✅ Signup link */}
        <p className="signup-link">
          Don&apos;t have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../styles/Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   function validateForm() {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!passwordRegex.test(password)) {
//       setError(
//         "Password must be at least 8 characters, include uppercase, lowercase and a number"
//       );
//       return false;
//     }

//     setError("");
//     return true;
//   }

//   function handleLogin(e) {
//     e.preventDefault();

//     if (!validateForm()) return;

//     axios
//       .post("http://localhost:5000/auth/login", {
//         email,
//         password,
//       })
      
        
// .then(() => {
//   // ✅ user logged in
//   localStorage.setItem("userLoggedIn", "true");

//   // ✅ tell Home to go to matches section
//   localStorage.setItem("gotoMatches", "true");

//   // ✅ go to Home
//   window.location = "/";
// });
//   }

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login</h2>

//         {error && <p className="error-text">{error}</p>}

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">Login</button>
//         </form>

//         {/* ✅ Signup link added here */}
//         <p className="signup-text">
//           Don’t have an account?{" "}
//           <Link to="/signup">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
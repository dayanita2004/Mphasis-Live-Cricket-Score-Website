import React, { useState } from "react";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    // Name validation
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(name)) {
      setError("Name must be at least 3 letters and contain only alphabets");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    const passwordRegex =
     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number"
      );
      return false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError("");
    return true;
  }

  function handleSignup(e) {
    e.preventDefault();

    if (!validateForm()) return;

    axios.post(
  "http://localhost:5000/auth/signup",
  {
    name,
    email,
    password,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
)
.then(() => {
  alert("Signup successful!");
  window.location = "/login";
})
.catch((err) => {
  console.error(err.response?.data || err.message);
  alert("Signup failed");
});

  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Signup
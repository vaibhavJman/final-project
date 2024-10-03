// src/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setError("User already exists. Please login.");
      return;
    }

    users.push({ email, password });

    // Store updated user list in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Set session status
    sessionStorage.setItem("sessionStatus", "active");
    sessionStorage.setItem("userEmail", email); // Store user email

    navigate("/login");
  };

  return (
    <div className="wrapper">
      <div className="main">
        <div className="row">
          <div className="side-image">
            <img src="../image/logo.png" alt="" />
            <div className="text">
              <p>
                Join the community of developers <i> - JMAN Group</i>
              </p>
            </div>
          </div>

          <form className="right" onSubmit={handleSignup}>
            <div className="input-box">
              <header>Sign Up</header>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button className="submit" type="submit">Signup</button>

              <div className="login">
                <p>
                  Already have an account?
                  <span onClick={() => navigate("/login")}>Login</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

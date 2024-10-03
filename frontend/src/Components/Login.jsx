// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const storedUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (storedUser) {
      // Set session status
      sessionStorage.setItem("sessionStatus", "active");
      sessionStorage.setItem("userEmail", email); // Store user email

      navigate("/welcome");
    } else {
      setError("Invalid email or password");
    }
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

          <form className="right" onSubmit={handleLogin}>
            <div className="input-box">
              <header>Log In</header>
              <div className="input-field">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="submit" type="submit">
                Login
              </button>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="signup">
                <p>
                  Don't have an account?{" "}
                  <span onClick={() => navigate("/signup")}>Signup</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

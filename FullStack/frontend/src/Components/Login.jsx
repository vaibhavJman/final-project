// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userId", user.id);

      switch (user.role) {
        case "ADMIN":
          navigate("/welcome");
          break;
        case "TRAINER":
          navigate("/trainer/dashboard");
          break;
        case "EMPLOYEE":
          navigate("/employee/dashboard");
          break;
        default:
          navigate("/welcome");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
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

              {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span> {error}
                </div>
              )}
              <button className="submit" type="submit">
                Login
              </button>


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

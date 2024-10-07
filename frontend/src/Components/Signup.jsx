// src/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE"); // Set default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to register the user
      const response = await axios.post("http://localhost:5000/api/user/register", {
        firstName,
        lastName,
        email,
        password,
        role // You can change this role based on the form data if needed
      });

      if (response.status === 201) {
        console.log("User registered successfully", response.data);
        navigate("/login"); // Redirect to login on successful registration
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); // Show error from backend
      } else {
        setError("Something went wrong. Please try again.");
      }
    }





    // navigate("/login");
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
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

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

              <div>
                <label>Role:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="ADMIN">Admin</option>
                  <option value="TRAINER">Trainer</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <button className="submit" type="submit" >Signup</button>

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

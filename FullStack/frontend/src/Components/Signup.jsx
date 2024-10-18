// src/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("• Password must be at least 8 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("• Password must contain at least one uppercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("• Password must contain at least one number.");
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push("• Password must contain at least one special character.");
    }
    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    } else {
      setPasswordErrors([]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          firstName,
          lastName,
          email,
          password,
          role,
          gender,
        }
      );

      if (response.status === 201) {
        console.log("User registered successfully", response.data);
        navigate("/login");
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
                <label>Gender:</label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
                {passwordErrors.length > 0 && (
                  <div className="password-errors">
                    {passwordErrors.map((error, index) => (
                      <p key={index} className="error-message">
                        {error}
                      </p>
                    ))}
                  </div>
                )}
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

              {error && <p className="error-message">{error}</p>}
              <button className="submit" type="submit">
                Signup
              </button>

              <div className="login">
                <p>
                  Already have an account?{" "}
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

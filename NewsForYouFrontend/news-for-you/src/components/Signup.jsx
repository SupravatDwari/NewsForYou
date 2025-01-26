// src/components/SignUp.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const payload = { name, email, password };
      const response = await axios.post(
        "https://localhost:7235/api/signup",
        payload
      );

      if (response.data.flag) {
        alert("Signup successful");
        navigate("/Login"); // Navigate to login after signup
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup", error);
      setError("Something went wrong. Please try again.");
    }
  };

  // Email validation
  const handleEmailChange = async (event) => {
    setEmail(event.target.value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(event.target.value)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await axios.get(
        `https://localhost:7235/api/checkemail?email=${event.target.value}`
      );
      if (!response.data.flag) {
        setError("Email already exists.");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error checking email", error);
      setError("Error while checking email. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title text-center">Welcome!! Signup Here</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="bttnSignup">
                    Submit
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <a href="/Login" className="link-primary">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

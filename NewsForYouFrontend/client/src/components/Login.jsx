import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Enter all values to proceed");
      return;
    }

    const payload = { email, password };

    try {
      const response = await axios.post("/api/login", payload);
      const result = response.data;

      if (result.authenticate) {
        sessionStorage.setItem("credential", result.jwtToken);

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000);

        document.cookie = `credential=${
          result.jwtToken
        };expires=${expirationDate.toUTCString()};path=/;`;

        if (email === "admin@gmail.com" && password === "admin") {
          document.cookie = `isAdmin=true;expires=${expirationDate.toUTCString()};path=/;`;
        }

        alert("Login Successful");
        window.location.href = "/Startup.html"; // Adjust this for React routing
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Error during login request.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title text-center">
                Welcome back! Please log in
              </h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">
                    Username
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={login}>
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="/Signup" className="link-primary">
                      Register
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

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setRegistering] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleForm = () => {
    setRegistering(!isRegistering);
    setSubmitted(false); // Reset submitted status when toggling form
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!email || !password || (isRegistering && !name)) {
      // Display error message for empty fields
      return;
    }

    try {
      const endpoint = isRegistering ? "register" : "login";
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: 'include', // Add this line
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      if (response.ok) {

        if (isRegistering) {
          toggleForm();
        } else {
          navigate("/Home");
        }
      } else {
        // Email or password is incorrect
      }
    } catch (error) {
      console.error("Error during login or register:", error);
      // Handle unexpected errors
    }
  };

  return (
    <div className="login-container">
      <form>
        {isRegistering && (
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control${submitted && !name ? " is-invalid" : ""}`}
                id="inputName"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {submitted && !name && (
                <div className="invalid-feedback">Name is required</div>
              )}
            </div>
          </div>
      )}
      <div className="form-group row">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className={`form-control${submitted && !email ? " is-invalid" : ""}`}
            id="inputEmail3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete ="current-username"
          />
          {submitted && !email && (
            <div className="invalid-feedback">Email is required</div>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className={`form-control${submitted && !password ? " is-invalid" : ""}`}
            id="inputPassword3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete ="current-password"
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary" onClick={handleLogin}>
            {isRegistering ? "Register" : "Sign in"}
          </button>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button type="button" className="btn btn-link" onClick={toggleForm}>
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;

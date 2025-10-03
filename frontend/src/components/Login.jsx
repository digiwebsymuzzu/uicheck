import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from "../utils";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Login = () => {
  const { fetchCart } = useContext(CartContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email && !password) {
      return handleError("name,email,password field are required");
    }
    try {
      const url = "https://147.93.108.82:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, error, jwtToken, firstName } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("userId", result._id); // ✅ yahan _id correct hai
        localStorage.setItem("loggedInUser", firstName);
        fetchCart();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <>
      <section>
        <div className="login-page bg-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1 py-20">
                <div className="bg-white shadow rounded">
                  <div className="row">
                    <div className="col-md-7 pe-0">
                      <h3 className="mb-3 px-20 pt-40">Login Now</h3>
                      <div className="form-left h-100 py-60 px-20">
                        <form onSubmit={handleSubmit} className="row g-4">
                          {/* Username */}
                          <div className="col-12">
                            <label htmlFor="username" className="form-label">
                              Username <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="bi bi-person-fill"></i>
                              </span>
                              <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter Email"
                                required
                              />
                            </div>
                          </div>

                          {/* Password */}
                          <div className="col-12">
                            <label htmlFor="password" className="form-label">
                              Password <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              {/* Lock icon left */}
                              <span className="input-group-text">
                                <i className="bi bi-lock-fill"></i>
                              </span>

                              {/* Password field */}
                              <input
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                required
                              />

                              {/* Eye icon right (always visible) */}
                              <span
                                className="input-group-text"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <i
                                  className={`bi ${
                                    showPassword ? "bi-eye-slash" : "bi-eye"
                                  }`}
                                ></i>
                              </span>
                            </div>
                          </div>

                          {/* Remember me + Forgot password */}
                          <div className="col-sm-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="rememberMe"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6 text-end">
                            <a
                              href="/forgot-password"
                              className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                            >
                              Forgot Password?
                            </a>
                          </div>

                          {/* Login Button */}
                          <div className="col-12">
                            <Link
                              to="/register"
                              className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline pt-20 float-end"
                            >
                              New to Udemandme? Create an account
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-primary px-22 py-18 float-start mt-4"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-5 ps-0 d-none d-md-block">
                      <div className="form-right h-100 bg-gray-50 text-white text-center pt-80">
                        <i className="bi bi-person-badge"></i>
                        <h2 className="fs-1 text-light">Welcome Back!!!</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;

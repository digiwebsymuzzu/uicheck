import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password } = signupInfo;
    if (!firstName && !email && !password) {
      return handleError("name,email,password field are required");
    }
    try {
      const url = "https://udemandme.cloud/api/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      // Handle HTTP errors
      if (!response.ok) {
        // For Joi validation errors (status 400)
        if (result.error && result.error.details) {
          const details = result.error.details[0].message; // first validation error
          return handleError(details);
        }
        // For other server errors
        return handleError(result.message || "Registration failed");
      }
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <section>
        <div className="register-page bg-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1 py-20">
                <div className="bg-white shadow rounded">
                  <div className="row">
                    <div className="col-md-7 pe-0">
                      <h3 className="mb-3 px-20 pt-40">Register Now</h3>
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
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control"
                                placeholder="Enter Name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="username" className="form-label">
                              Email Address{" "}
                              <span className="text-danger">*</span>
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
                              to="/login"
                              className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline pt-20 float-end"
                            >
                              Existing User? Log in
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-primary px-22 py-18 float-start mt-4"
                            >
                              SignUp
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-5 ps-0 d-none d-md-block ">
                      <div className="form-right h-100 bg-gray-50 text-white text-center pt-120">
                        <i className="bi bi-person-badge"></i>
                        <h2 className="fs-1 text-light px-3">
                          Create an Account
                        </h2>
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
export default Register;

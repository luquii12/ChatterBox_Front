import React from "react";
import "../styles/LoginSingIn.css";

const LoginSignup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="section">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap -mx-2 justify-center">
            <div className="w-full px-2 text-center self-center py-5">
              <div className="section pb-5 pt-5 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>

                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {/* FRONT (LOGIN) */}
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="text-2xl font-bold mb-4 pb-3">Log In</h4>
                          <div className="form-group mb-4">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Email"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mb-4 mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Password"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button className="btn mt-4">Login</button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BACK (SIGNUP) */}
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="text-2xl font-bold mb-3 pb-3">Sign Up</h4>
                          <div className="form-group mb-4">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="Full Name"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mb-4 mt-2">
                            <input
                              type="tel"
                              className="form-style"
                              placeholder="Phone Number"
                            />
                            <i className="input-icon uil uil-phone"></i>
                          </div>
                          <div className="form-group mb-4 mt-2">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Email"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mb-4 mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Password"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button className="btn mt-4">Register</button>
                        </div>
                      </div>
                    </div>
                    {/* END card-3d-wrapper */}
                  </div>
                </div>
                {/* END card-3d-wrap */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

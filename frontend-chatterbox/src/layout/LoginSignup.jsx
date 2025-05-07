import React, { useState } from "react";
import "../styles/LoginSingIn.css";
import UserServices from "../services/UserServices";

const LoginSignup = () => {
  const [formLogIn, setFormLogIn] = useState({
    email: "",
    password: "",
  });

  const [formSignUp, setFormSignUp] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormLogIn((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setFormSignUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formLogIn);
    UserServices.logIn(formLogIn)
    .then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log(error);
    })
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al backend
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formSignUp);
    // Aquí puedes agregar la lógica para enviar los datos de registro al backend
  };

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
                          <form onSubmit={handleLoginSubmit}>
                            <div className="form-group mb-4">
                              <input
                                type="email"
                                name="email"
                                className="form-style"
                                placeholder="Email"
                                value={formLogIn.email}
                                onChange={handleLoginChange}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mb-4 mt-2">
                              <input
                                type="password"
                                name="password"
                                className="form-style"
                                placeholder="Password"
                                value={formLogIn.password}
                                onChange={handleLoginChange}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Login
                            </button>
                          </form>
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
                          <form onSubmit={handleSignUpSubmit}>
                            <div className="form-group mb-4">
                              <input
                                type="text"
                                name="fullName"
                                className="form-style"
                                placeholder="Full Name"
                                value={formSignUp.fullName}
                                onChange={handleSignUpChange}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mb-4 mt-2">
                              <input
                                type="tel"
                                name="phoneNumber"
                                className="form-style"
                                placeholder="Phone Number"
                                value={formSignUp.phoneNumber}
                                onChange={handleSignUpChange}
                              />
                              <i className="input-icon uil uil-phone"></i>
                            </div>
                            <div className="form-group mb-4 mt-2">
                              <input
                                type="email"
                                name="email"
                                className="form-style"
                                placeholder="Email"
                                value={formSignUp.email}
                                onChange={handleSignUpChange}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mb-4 mt-2">
                              <input
                                type="password"
                                name="password"
                                className="form-style"
                                placeholder="Password"
                                value={formSignUp.password}
                                onChange={handleSignUpChange}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Register
                            </button>
                          </form>
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
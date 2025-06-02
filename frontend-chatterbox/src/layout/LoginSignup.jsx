import React, { useState } from "react";
import "../styles/LoginSingIn.css";
import UserServices from "../services/UserServices";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router";

const LoginSignup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formLogIn, setFormLogIn] = useState({
    email: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState({ email: "", password: "", general: "" });

  const [formSignUp, setFormSignUp] = useState({
    apodo: "",
    nombre_usuario: "",
    email: "",
    password: "",
  });
  const [errorSignUp, setErrorSignUp] = useState({
    apodo: "",
    nombre_usuario: "",
    email: "",
    password: "",
    general: ""
  });
  const [successSignUp, setSuccessSignUp] = useState(""); // Nuevo estado para mensaje de éxito

  // Validación para login
  const validateLogin = () => {
    const errors = {};
    if (!formLogIn.email.trim()) errors.email = "El email es obligatorio";
    if (!formLogIn.password.trim()) errors.password = "La contraseña es obligatoria";
    return errors;
  };

  // Validación para registro
  const validateSignUp = () => {
    const errors = {};
    if (!formSignUp.apodo.trim()) errors.apodo = "El nombre es obligatorio";
    if (!formSignUp.nombre_usuario.trim()) errors.nombre_usuario = "El usuario es obligatorio";
    if (!formSignUp.email.trim()) errors.email = "El email es obligatorio";
    if (!formSignUp.password.trim()) errors.password = "La contraseña es obligatoria";
    return errors;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormLogIn((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorLogin((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setFormSignUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorSignUp((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setErrorLogin(errors);
      return;
    }
    UserServices.logIn(formLogIn)
      .then((response) => {
        login(response.data);
        navigate("/");
      })
      .catch((error) => {
        let errors = {};
        if (error.status === 404) {
          errors.email = "Email no encontrado";
        } else if (error.status === 401) {
          errors.password = "Contraseña incorrecta";
        } else if (error.response && error.response.data && error.response.data.message) {
          errors.general = error.response.data.message;
        } else {
          errors.general = "Error al iniciar sesión";
        }
        setErrorLogin(errors);
      });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const errors = validateSignUp();
    if (Object.keys(errors).length > 0) {
      setErrorSignUp(errors);
      return;
    }
    UserServices.signUp(formSignUp)
      .then((response) => {
        setFormSignUp({
          apodo: "",
          nombre_usuario: "",
          email: "",
          password: "",
        });
        setErrorSignUp({});
        setSuccessSignUp("¡Registro correcto! Redirigiendo al login...");
        setTimeout(() => {
          setSuccessSignUp("");
          document.getElementById("reg-log").checked = false;
        }, 1500); // Espera 1.5 segundos antes de pasar al login
      })
      .catch((error) => {
        let errors = {};
        if (error.status === 400) {
          errors.general = "Datos inválidos";
        } else if (error.status === 409) {
          errors.nombre_usuario = "El usuario ya existe";
        } else if (error.response && error.response.data && error.response.data.message) {
          errors.general = error.response.data.message;
        } else {
          errors.general = "Error al registrar";
        }
        setErrorSignUp(errors);
      });
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
                          <h4 className="text-2xl font-bold mb-4 pb-3">
                            Log In
                          </h4>
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
                            {errorLogin.email && (
                              <p className="text-red-500 text-sm">
                                {errorLogin.email}
                              </p>
                            )}
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
                            {errorLogin.password && (
                              <p className="text-red-500 text-sm">
                                {errorLogin.password}
                              </p>
                            )}
                            {errorLogin.general && (
                              <p className="text-red-500 text-sm">
                                {errorLogin.general}
                              </p>
                            )}
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
                          <h4 className="text-2xl font-bold mb-3 pb-3">
                            Sign Up
                          </h4>
                          <form onSubmit={handleSignUpSubmit}>
                            <div className="form-group mb-4">
                              <input
                                type="text"
                                name="apodo"
                                className="form-style"
                                placeholder="Full Name"
                                value={formSignUp.apodo}
                                onChange={handleSignUpChange}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            {errorSignUp.apodo && (
                              <p className="text-red-500 text-sm">
                                {errorSignUp.apodo}
                              </p>
                            )}
                            <div className="form-group mb-4 mt-2">
                              <input
                                type="text"
                                name="nombre_usuario"
                                className="form-style"
                                placeholder="Username"
                                value={formSignUp.nombre_usuario}
                                onChange={handleSignUpChange}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            {errorSignUp.nombre_usuario && (
                              <p className="text-red-500 text-sm">
                                {errorSignUp.nombre_usuario}
                              </p>
                            )}
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
                            {errorSignUp.email && (
                              <p className="text-red-500 text-sm">
                                {errorSignUp.email}
                              </p>
                            )}
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
                            {errorSignUp.password && (
                              <p className="text-red-500 text-sm">
                                {errorSignUp.password}
                              </p>
                            )}
                            {errorSignUp.general && (
                              <p className="text-red-500 text-sm">
                                {errorSignUp.general}
                              </p>
                            )}
                            {successSignUp && (
                              <div className="mb-2 text-green-500 text-sm">{successSignUp}</div>
                            )}
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

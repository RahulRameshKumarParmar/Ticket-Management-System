import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { globalAccess } from "../Dashboard/ContextAPI";
import FloatingTickets from "./FloatingTickets";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(globalAccess);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (!username) {
      setShowEmailWarning(true);
    }
    else {
      setShowEmailWarning(false);
    }
    if (!password) {
      setShowPasswordWarning(true);
    }
    else {
      setShowPasswordWarning(false);
    }
  }, [username, password])

  const handleLogin = (event) => {
    event.preventDefault();
    setOnLoad(true);

    if (username && password) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    }
  };

  return (
    <div className="grid-container">
      <div className="login-design">
        <FloatingTickets />
        <div className="website-box">
          <h2 className="website-name">Tasket</h2>
          <p className="website-description">Streamline your support workflow with intelligent ticket</p>
        </div>
      </div>
      <div className="login-container">
        <form className="login-form">
          <h2 className="welcome-heading">Welcome</h2>
          <p className="welcome-intro">Sign in to your ticket management dashboard</p>
          <label className="form-label">User Name</label>
          <input className="form-input"
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className={`warning-field ${(showEmailWarning && onLoad) ? "show-warning-field" : null}`}>
            <span>
              <FaExclamationCircle className="warning-symbol" />
            </span>
            <span className="warning-name">Username is required</span>
          </div>

          <div className="password-section">
            <label className="form-label">Password</label>
            <input className="form-input"
              type={(showPassword) ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)} className="password-icon">{(showPassword) ? <FaEye /> : <FaEyeSlash />}</span>
          </div>

          <div className={`warning-field ${(showPasswordWarning && onLoad) ? "show-warning-field" : null}`}>
            <span>
              <FaExclamationCircle className="warning-symbol" />
            </span>
            <span className="warning-name">Password is required</span>
          </div>

          <div className="remember-section">
            <div className="remember-box">
              <input className="remember-checkbox" type="checkbox" />
              <label>Remember Me</label>
            </div>
            <div>
              <a className="forget-password-option" href="#" onClick={(e) => e.preventDefault()}>Forget Password?</a>
            </div>
          </div>
          <button className="login-button" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

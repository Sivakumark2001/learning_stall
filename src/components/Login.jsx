import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResetMsg("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetMsg("");
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="auth-input"
      />
      <button type="submit" className="auth-btn">Login</button>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <Link to="/register" style={{ fontSize: "0.95em" }}>Register</Link>
        <button
          type="button"
          className="auth-link-btn"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
      </div>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      {resetMsg && <div style={{ color: "green", marginTop: 8 }}>{resetMsg}</div>}
    </form>
  );
}

export default Login;
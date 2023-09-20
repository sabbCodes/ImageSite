import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth methods

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the Firebase auth instance
      const auth = getAuth();

      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, call onLogin(true)
      onLogin(true);
    } catch (error) {
      // Handle authentication errors
      alert('Authentication failed. Please check your email and password.');
      console.error('Authentication Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="loginForm">
        <h2 className="login-text">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="loginButton">
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


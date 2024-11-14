import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; 
import './LoginRegister.css'; // Import the CSS file

function Login({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Implement login logic here
    console.log('Login attempt', { username, password });
  };

  return (
    <div className="background flex items-center justify-center min-h-screen flex-col">
      <div className="flex justify-center mb-4">
        <a href="/">
          <img src="/rebook-images/Component2.png" alt="ReBook Logo" className="h-16" />
        </a>
      </div>
      <div className="relative flex flex-col bg-white p-5 rounded-3xl shadow-md space-y-3 w-full max-w-sm">
        <button onClick={onClose} className="absolute top-3 right-3 text-black-500 hover:text-black-700">
          <FaTimes />
        </button>
        <div className="flex justify-center mb-3">
          <h2 className="text-3xl">LOGIN</h2>
        </div>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                value={username}
                placeholder="Username"
                className="w-full p-2 rounded-lg border border-gray-300 text-center"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                placeholder="Password"
                className="w-full p-2 rounded-lg border border-gray-300 text-center"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-blue-700">
              Login
            </button>
            <Link to="/register" className="block text-center text-black-500 hover:underline mt-2">Create Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

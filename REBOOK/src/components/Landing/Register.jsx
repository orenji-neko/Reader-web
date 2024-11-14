import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; 
import './LoginRegister.css'; // Import the CSS file

function Register({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [contacts, setContacts] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Implement register logic here
    console.log('Register attempt', { fullName, username, contacts, email, password });
  };
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="background flex items-center justify-center min-h-screen flex-col">
      <div className="flex justify-center mb-4">
        <a href="/">
          <img src="/rebook-images/Component2.png" alt="ReBook Logo" className="h-16" />
        </a>
      </div>
      <div className="relative flex flex-col bg-white p-5 rounded-3xl shadow-md space-y-3 w-full max-w-sm">
      <button onClick={handleClose} className="absolute top-3 right-3 text-black-500 hover:text-black-700">
          <FaTimes />
        </button>
        <div className="flex justify-center mb-3">
          <h2 className="text-3xl">REGISTER</h2>
        </div>
        <div className="register-form">
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                value={fullName}
                placeholder="Full name"
                className="w-full p-2 rounded-lg border border-gray-400 text-center"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
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
                type="text"
                value={contacts}
                placeholder="Contacts"
                className="w-full p-2 rounded-lg border border-gray-300 text-center"
                onChange={(e) => setContacts(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                placeholder="Email"
                className="w-full p-2 rounded-lg border border-gray-300 text-center"
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="mb-3">
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                className="w-full p-2 rounded-lg border border-gray-300 text-center"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg ">
              Create Account
            </button>
            <Link to="/login" className="block text-center text-black-500 hover:underline mt-2">Already have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

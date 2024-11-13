import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; 
import './LoginRegister.css'; // Import the CSS file

function Register({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [contacts, setContacts] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Implement register logic here
    console.log('Register attempt', { fullName, username, contacts, email, password });
  };

  return (
    <div className="background">
      <div className="register-form">
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contacts:</label>
            <input
              type="text"
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          <Link to="/login">Already have an account? Login</Link>
        </form>
        <button onClick={onClose}><FaTimes /></button>
      </div>
    </div>
  );
}

export default Register;

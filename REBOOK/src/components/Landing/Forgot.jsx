import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; 
import './LoginRegister.css'; // Import the CSS file

function Forgot({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
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
      <div className="relative flex flex-col bg-white p-9 rounded-3xl shadow-md space-y-3 w-full max-w-sm" style={{ height: '280px' }}>
        <button onClick={handleClose} className="absolute top-3 right-3 text-black-500 hover:text-black-700">
          <FaTimes />
        </button>
        <div className="flex justify-center mb-3">
          <h2 className="text-2xl">FORGOT PASSWORD</h2>
        </div>
        <div className="register-form">
          <form >
            <div className="mb-3">
              <input
                type="text"
                value={username}
                placeholder="INPUT USERNAME"
                className="w-full p-2 rounded-lg border border-gray-300 text-center"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                placeholder="INPUT EMAIL"
                className="w-full p-2 rounded-lg border border-gray-300 text-center"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg ">
            <Link to="/code" className="w-full bg-teal-500 text-white py-2 rounded-lg ">Send Code</Link>
       
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;

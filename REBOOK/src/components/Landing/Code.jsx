import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; 
import './LoginRegister.css'; // Import the CSS file

function Code({ onClose }) {
  const [code, setCode] = useState('');
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
      <div className="relative flex flex-col bg-white p-6 rounded-3xl shadow-md space-y-3 w-full max-w-sm" style={{ height: '230px' }}>
        <button onClick={handleClose} className="absolute top-3 right-3 text-black-500 hover:text-black-700">
          <FaTimes />
        </button>
        <div className="flex justify-center mb-3">
          <h2 className="text-2xl">CODE</h2>
        </div>
        <div className="register-form">
          <form >
            <div className="mb-3">
              <input
                type="code"
                value={code}
                placeholder="Enter Code"
                className="w-full p-2 rounded-lg border border-gray-300 text-center"
                onChange={(e) => setCode(e.target.value)}
                
              />
            </div>
            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg ">
            <Link to="/newpass" className="w-full bg-teal-500 text-white py-2 rounded-lg ">Enter</Link>
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Code;

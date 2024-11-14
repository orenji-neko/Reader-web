import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; 
import './LoginRegister.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Implement login logic here
    console.log('Login attempt', { email, password });
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
      <div className="relative flex flex-col bg-white p-5 rounded-3xl shadow-md space-y-3 w-full max-w-xs" style={{ height: '320px' }}>
        <button onClick={handleClose} className="absolute top-3 right-3 text-black-500 hover:text-black-700">
          <FaTimes />
        </button>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <header>Email</header>
            <div className="mb-3">
              <input
                type="text"
                value={email}
                placeholder="user@gmail.com..."
                className="w-full p-2 rounded-lg border border-gray-300 "
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <header>Password</header>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                placeholder="password..."
                className="w-full p-2 rounded-lg border border-gray-300 "
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-blue-700">
              Login
            </button>
            <Link to="/forgot" className="block text-center text-black-500 hover:underline mt-2">Forgot Password?</Link>
            <Link to="/register" className="block text-center text-black-500 hover:underline mt-2">Create Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

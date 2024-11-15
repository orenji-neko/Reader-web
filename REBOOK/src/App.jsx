import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import BorrowB from './components/BorrowB';
import History from './components/History';
import BookDetails from './components/BookDetails';
import User from './components/User';
import LandingLayout from './components/Layout/LandingLayout';
import Category from './components/Category';
import LiblandingLayout from './components/Admin/LiblandingLayout';
import LibLanding from './components/Admin/LibLanding';
import Request from './components/Admin/Request';
import BookInventory from './components/Admin/BookInventory';
import Readers from './components/Admin/Readers';
import DueBooks from './components/Admin/DueBooks';
import Index from './components/Main';
import Login from './components/Landing/Login';
import Register from './components/Landing/Register';
import Forgot from './components/Landing/Forgot';
import Code from './components/Landing/Code';
import Newpass from './components/Landing/Newpass';

import { Navigate } from 'react-router-dom';
import { useAuth } from './utils/AuthProvider'; // Make sure this hook returns the token or authentication status
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth(); // Replace with your actual authentication logic

  if (!token) {
    console.log(token)
    return <Navigate to="/login" />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/code" element={<Code />} />
        <Route path="/newpass" element={<Newpass />} />

        <Route path="/reader" element={
          <ProtectedRoute> 
            <LandingLayout /> 
          </ProtectedRoute>}>
          
          <Route index element={<Landing />} />

          <Route path="borrow" element={<ProtectedRoute><BorrowB /></ProtectedRoute>} />
          <Route path="history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="book/:bookId" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
          <Route path="user" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="category/:categoryId" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        </Route>
        <Route path="/librarian" element={<ProtectedRoute><LiblandingLayout /></ProtectedRoute>}>
          <Route index element={<LibLanding />} />
          <Route path="request" element={<ProtectedRoute><Request /></ProtectedRoute>} />
          <Route path="inventory" element={<ProtectedRoute><BookInventory /></ProtectedRoute>} />
          <Route path="readers" element={<ProtectedRoute><Readers /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="due" element={<ProtectedRoute><DueBooks /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
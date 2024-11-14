import { useState } from 'react';
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

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/reader" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="borrow" element={<BorrowB />} />
          <Route path="history" element={<History />} />
          <Route path="book/:bookId" element={<BookDetails />} />
          <Route path="user" element={<User />} />
          <Route path="category/:categoryId" element={<Category />} />
        </Route>
        <Route path="/librarian" element={<LiblandingLayout />}>
          <Route index element={<LibLanding />} />
          <Route path="request" element={<Request />} />
          <Route path="inventory" element={<BookInventory />} />
          <Route path="readers" element={<Readers />} />
          <Route path="users" element={<User />} />
          <Route path="due" element={<DueBooks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

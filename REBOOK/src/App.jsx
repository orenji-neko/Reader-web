import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import BorrowB from './components/BorrowB';
import History from './components/History';
import BookDetails from './components/BookDetails';
import User from './components/User';
import LandingLayout from './components/Layout/LandingLayout';
import Category from './components/Category';
import LiblandingLayout from './components/Admin/LiblandingLayout'; // Correct path for LiblandingLayout
import LibLanding from './components/Admin/LibLanding'; // Correct path for LibLanding
import Request from './components/Admin/Request'; // Import the Request component
import BookInventory from './components/Admin/BookInventory'; // Import the Book Inventory component
import Readers from './components/Admin/Readers'; // Import the Readers component
import DueBooks from './components/Admin/DueBooks'; // Import the Due Books component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index                        element={<Landing />} />
          <Route path="borrow"                element={<BorrowB />} />
          <Route path="history"               element={<History />} />
          <Route path="book/:bookId"          element={<BookDetails />} />
          <Route path="user"                  element={<User />} />
          <Route path="category/:categoryId"  element={<Category />} />
        </Route>
        <Route path="/admin"                  element={<LiblandingLayout />}>
          <Route index                        element={<LibLanding />} />
          <Route path="request"               element={<Request />} />
          <Route path="inventory"         element={<BookInventory />} />
          <Route path="readers"               element={<Readers />} />
          <Route path="user"                  element={<User />} />
          <Route path="due"                   element={<DueBooks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

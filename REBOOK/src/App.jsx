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
import Index from './components/Main'; // 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Reader" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="BorrowB" element={<BorrowB />} />
          <Route path="History" element={<History />} />
          <Route path="book/:bookId" element={<BookDetails />} />
          <Route path="User" element={<User />} />
          <Route path="category/:categoryId" element={<Category />} />
        </Route>
        <Route path="/Librarian" element={<LiblandingLayout />}>
          <Route index element={<LibLanding />} /> {/* This is your dashboard */}
          <Route path="Request" element={<Request />} /> {/* Request component */}
          <Route path="BookInventory" element={<BookInventory />} /> {/* Book Inventory component */}
          <Route path="Readers" element={<Readers />} /> {/* Readers component */}
          <Route path="LibUser" element={<User />} />
          
          <Route path="Due" element={<DueBooks />} /> {/* Due Books component */}
        </Route>
        <Route path="/" element={<Index />}>
          {/* Login & Register*/}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

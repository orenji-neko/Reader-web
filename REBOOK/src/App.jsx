import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingLayout from "./components/Layout/LandingLayout";
import BorrowB from "./components/BorrowB";
import History from "./components/History";
import BookDetails from "./components/BookDetails"; // Import the BookDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="BorrowB" element={<BorrowB />} />
          <Route path="History" element={<History />} />
          {/* Add the book details route */}
          <Route path="books/:bookTitle" element={<BookDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

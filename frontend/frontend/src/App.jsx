import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseCode" element={<CourseDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

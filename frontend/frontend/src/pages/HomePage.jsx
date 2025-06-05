import UploadForm from "../components/UploadForm";
import FileTable from "../components/FileTable";
import SearchForm from "../components/SearchForm";
import CourseList from "../components/CoureseList";
import { useState, useEffect } from "react";

function HomePage() {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`http://127.0.0.1:8000/past-questions?${params}`);
    const data = await response.json();
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Past Question Upload Portal</h1>

        <div className="bg-white shadow-md rounded p-6">
          <UploadForm />
        </div>

        <div className="bg-white shadow-md rounded p-6 mt-10">
          <h2 className="text-xl font-semibold mb-4">Search Past Questions</h2>
          <SearchForm onSearch={fetchQuestions} />
        </div>

        <div className="bg-white shadow-md rounded p-6 mt-10">
          <FileTable files={questions} onDelete={fetchQuestions} />
        </div>

        <div className="bg-white shadow-md rounded p-6 mt-10">
          <CourseList files={questions} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

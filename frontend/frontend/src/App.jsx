import UploadForm from "./components/UploadForm";
import FileTable from "./components/FileTable";
import SearchForm from "./components/SearchForm";
import { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`http://127.0.0.1:8000/past-questions?${params}`);
    const data = await response.json();
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions(); // Load all questions initially
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload Past Question</h1>
      <UploadForm />
      
      <h2 style={{ marginTop: 40 }}>Search Past Questions</h2>
      <SearchForm onSearch={fetchQuestions} />

      <FileTable files={questions} />
    </div>
  );
}

export default App;


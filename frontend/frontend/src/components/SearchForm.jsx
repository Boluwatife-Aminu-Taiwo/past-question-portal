import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      course_code: courseCode,
      course_title: courseTitle,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow flex flex-col md:flex-row gap-4 items-end">
      <div className="flex flex-col w-full md:w-1/2">
        <label className="text-sm font-medium mb-1">Course Code</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g. TPE522"
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2">
        <label className="text-sm font-medium mb-1">Course Title</label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g. Reservoir Engineering"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;

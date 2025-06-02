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
    <form onSubmit={handleSubmit} className="p-4 flex gap-4 flex-wrap items-end">
      <div>
        <label className="block text-sm">Course Code</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="e.g. TPE522"
        />
      </div>

      <div>
        <label className="block text-sm">Course Title</label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="e.g. Reservoir Engineering"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;

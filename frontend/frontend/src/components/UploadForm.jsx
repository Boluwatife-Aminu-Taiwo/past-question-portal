import { useState } from "react";

export default function UploadForm() {
  const [courseCode, setCourseCode] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseCode || !file) {
      setMessage("Please provide course code and file.");
      return;
    }

    const formData = new FormData();
    formData.append("course_code", courseCode);
    formData.append("year", year);
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(`Upload successful! Record ID: ${data.id}`);
        setCourseCode("");
        setFile(null);
      } else {
        setMessage("Upload failed.");
      }
    } catch (err) {
      setMessage("Error uploading file.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Form</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Course Code</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Year</label>
        <input
          type="text"
          name="year"
          placeholder="e.g. 2022"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </form>
  );
}

import React, { useState } from "react";

export default function UploadForm() {
  const [courseCode, setCourseCode] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseCode || !file) {
      setMessage("Please provide course code and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("course_code", courseCode);
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Upload successful! Record ID: ${data.id}`);
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      setMessage("Error uploading file.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div>
        <label>Course Code:</label><br />
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Past Question File:</label><br />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>

      <button type="submit" style={{ marginTop: 10 }}>Upload</button>

      {message && <p>{message}</p>}
    </form>
  );
}

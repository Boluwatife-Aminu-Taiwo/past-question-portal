import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CourseDetailPage = () => {
  const { courseCode } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/past-questions?course_code=${courseCode}`)
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        setLoading(false);
      });
  }, [courseCode]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Past Questions for {courseCode.toUpperCase()}
      </h1>

      {files.length === 0 ? (
        <p className="text-gray-500">No past questions found.</p>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="border rounded p-4 shadow-sm">
              <p><span className="font-semibold">Year:</span> {file.year || "N/A"}</p>
              <p><span className="font-semibold">Uploaded:</span> {new Date(file.uploaded_at).toLocaleString()}</p>
              <a
                href={`http://localhost:8000/past-questions/${file.filename}`}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.filename}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;

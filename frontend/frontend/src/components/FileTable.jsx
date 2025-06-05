import { Link } from "react-router-dom";

const FileTable = ({ files }) => {
  if (!files.length) return <p className="text-center text-gray-500 mt-6">No past questions found.</p>;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/past-questions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("File deleted successfully.");
        onDelete?.();  // trigger refresh in parent
      } else {
        alert("Failed to delete file.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting file.");
    }
  };


  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm text-left border border-gray-200 shadow rounded">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            <th className="p-3">Course Code</th>
            <th className="p-3">Course Title</th>
            <th className="p-3">File</th>
            <th className="p-3">Uploaded At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {files.map((file) => (
            <tr key={file.id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                <Link to={`/course/${file.course_code}`} className="text-blue-600 hover:underline">
                  {file.course_code}
                </Link>
              </td>
              <td className="p-3">{file.course?.title || "N/A"}</td>
              <td className="p-3">
                <a
                  href={`http://127.0.0.1:8000/past-questions/${file.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {file.filename}
                </a>
              </td>
              <td className="p-3 text-gray-600">
                {new Date(file.uploaded_at).toLocaleString()}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(file.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;

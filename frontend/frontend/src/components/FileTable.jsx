const FileTable = ({ files }) => {
  if (!files.length) return <p className="text-center text-gray-500 mt-6">No past questions found.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm text-left border border-gray-200 shadow rounded">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            <th className="p-3">Course Code</th>
            <th className="p-3">Course Title</th>
            <th className="p-3">File</th>
            <th className="p-3">Uploaded At</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {files.map((file) => (
            <tr key={file.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{file.course_code}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;

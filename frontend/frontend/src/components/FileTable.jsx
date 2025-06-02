const FileTable = ({ files }) => {
  if (!files.length) return <p>No files found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Course Title</th>
          <th>File</th>
          <th>Uploaded At</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file.id}>
            <td>{file.course_code}</td>
            <td>{file.course_title}</td>
            <td>
              <a
                href={`http://127.0.0.1:8000/past-questions/${file.filename}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.filename}
              </a>
            </td>
            <td>{new Date(file.uploaded_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;
import { useEffect, useState } from "react";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get-courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Available Courses</h2>
      <ul className="list-disc pl-6">
        {courses.map((course) => (
          <li key={course.code}>
            {course.code} - {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

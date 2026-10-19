import React, { useState } from 'react';

const StudentList = ({ students, onDeleteStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc sinh viên theo tên tìm kiếm
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xóa có hỏi xác nhận
  const handleDelete = (id, name) => {
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa sinh viên "${name}" không?`);
    if (isConfirmed) {
      onDeleteStudent(id);
    }
  };

  return (
    <div className="mt-4">
      {/* Ô tìm kiếm theo tên */}
      <div className="mb-4 max-w-md">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên sinh viên..."
          className="border p-2 w-full rounded text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bảng danh sách sinh viên */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="border-b bg-gray-200 text-black">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Tên Sinh Viên</th>
            <th className="p-2 border">GPA</th>
            <th className="p-2 border">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id} className="border-b text-center">
                <td className="p-2 border">{student.id}</td>
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.gpa}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(student.id, student.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Không tìm thấy sinh viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
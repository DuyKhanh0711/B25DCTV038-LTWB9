import React, { useState } from 'react';

const StudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [gpa, setGpa] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate GPA trong khoảng từ 0 đến 4
    const gpaNum = parseFloat(gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setErrorMsg('Đểm GPA phải là số nằm trong khoảng từ 0 đến 4!');
      return;
    }

    if (!name.trim()) {
      setErrorMsg('Vui lòng nhập tên sinh viên!');
      return;
    }

    // Nếu hợp lệ
    setErrorMsg('');
    onAddStudent({ name, gpa: gpaNum });
    setName('');
    setGpa('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded my-4 max-w-md">
      <h3 className="font-bold text-lg mb-2">Thêm Sinh Viên Mới</h3>
      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      
      <div className="mb-2">
        <label className="block text-sm font-medium">Tên sinh viên:</label>
        <input
          type="text"
          className="border p-2 w-full rounded text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Điểm GPA (0 - 4):</label>
        <input
          type="number"
          step="0.1"
          className="border p-2 w-full rounded text-black"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
        Thêm sinh viên
      </button>
    </form>
  );
};

export default StudentForm;
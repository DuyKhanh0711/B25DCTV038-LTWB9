import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useFetch } from './hooks/useFetch';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import ThemeToggle from './components/ThemeToggle';

const API_URL = 'https://6ad637e7f71f154ac486aa01.mockapi.io/students'; 

const MainApp = () => {
  const { data: students, setData, loading, error, refetch } = useFetch(API_URL);

  // Hàm Thêm Sinh Viên (POST)
  const handleAddStudent = async (newStudent) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        refetch(); // Tải lại danh sách từ API
      }
    } catch (err) {
      console.error('Lỗi khi thêm sinh viên:', err);
    }
  };

  // Hàm Xóa Sinh Viên (DELETE)
  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Cập nhật lại UI lập tức
        setData((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Lỗi khi xóa sinh viên:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Sinh Viên (Hooks)</h1>
        <ThemeToggle />
      </div>

      <StudentForm onAddStudent={handleAddStudent} />

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}
      {!loading && !error && (
        <StudentList students={students} onDeleteStudent={handleDeleteStudent} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
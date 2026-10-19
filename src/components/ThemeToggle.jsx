import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded shadow-sm hover:opacity-80 transition"
    >
      Chuyển sang giao diện {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
    </button>
  );
};

export default ThemeToggle;
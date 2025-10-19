import React from 'react';
import { useTheme } from './useTheme';

const ThemeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="menu-section">
      <span className="menu-title">Theme</span>
      <button onClick={toggleTheme} className="theme-toggle-button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        {theme === 'dark' ? (
          <span role="img" aria-label="Sun">☀️</span>
        ) : (
          <span role="img" aria-label="Moon">🌙</span>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
import React from 'react';
import { Menu, Sun, Moon, Globe } from 'lucide-react';
import { translations } from '../App';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  language: 'en' | 'ru';
  onMenuOpen: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  language,
  onMenuOpen,
  onHomeClick,
}) => {
  const t = translations[language];

  return (
    <header>
      <div className="header-title-container">
        <button className="logo-btn" onClick={onMenuOpen} title="Open Menu">
          <Menu size={22} />
        </button>
        <h1 
          className="app-title" 
          onClick={onHomeClick} 
          style={{ cursor: 'pointer' }}
          title="Go to Home"
        >
          {t.appTitle}
        </h1>
      </div>

      <div className="header-actions">
        {/* Portfolio link */}
        <a 
          href="https://myappst.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn"
          title={language === 'en' ? 'More Apps' : 'Другие приложения'}
          style={{ textDecoration: 'none' }}
        >
          <Globe size={20} />
        </a>

        {/* Theme switch */}
        <button 
          className="action-btn" 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;

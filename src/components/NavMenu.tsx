import React from 'react';
import { Landmark, Globe, Coins, Map, Info, BookOpen, BarChart3, HelpCircle, X } from 'lucide-react';
import { translations } from '../App';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  setView: (view: string) => void;
  language: 'en' | 'ru';
  onOpenStats: () => void;
  onOpenAbout: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({
  isOpen,
  onClose,
  currentView,
  setView,
  language,
  onOpenStats,
  onOpenAbout,
}) => {
  const t = translations[language];

  const handleNavigate = (view: string) => {
    setView(view);
    onClose();
  };

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && <div className="menu-overlay" onClick={onClose} />}

      {/* Drawer Container */}
      <div className={`menu-drawer ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 1rem 0.5rem 1rem' }}>
          <button className="action-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Group: Views */}
        <div className="menu-group">
          <div className="menu-group-title">{language === 'en' ? 'Views' : 'Режимы'}</div>
          
          <button 
            className={`menu-item ${currentView === 'olympics' ? 'active' : ''}`}
            onClick={() => handleNavigate('olympics')}
          >
            <Landmark size={18} />
            <span>{t.menuOlympics}</span>
          </button>

          <button 
            className={`menu-item ${currentView === 'countries' ? 'active' : ''}`}
            onClick={() => handleNavigate('countries')}
          >
            <Globe size={18} />
            <span>{t.menuCountries}</span>
          </button>

          <button 
            className={`menu-item ${currentView === 'coins' ? 'active' : ''}`}
            onClick={() => handleNavigate('coins')}
          >
            <Coins size={18} />
            <span>{t.menuCoins}</span>
          </button>
        </div>

        {/* Group: Maps */}
        <div className="menu-group">
          <div className="menu-group-title">{language === 'en' ? 'Maps' : 'Карты'}</div>

          <button 
            className={`menu-item ${currentView === 'olympicsMap' ? 'active' : ''}`}
            onClick={() => handleNavigate('olympicsMap')}
          >
            <Map size={18} />
            <span>{t.submenuOlympicsMap}</span>
          </button>

          <button 
            className={`menu-item ${currentView === 'countriesMap' ? 'active' : ''}`}
            onClick={() => handleNavigate('countriesMap')}
          >
            <Map size={18} />
            <span>{t.submenuCountriesMap}</span>
          </button>
        </div>

        {/* Group: Info & Tools */}
        <div className="menu-group" style={{ flex: 1 }}>
          <div className="menu-group-title">{language === 'en' ? 'General' : 'Общее'}</div>

          <button 
            className={`menu-item ${currentView === 'info' ? 'active' : ''}`}
            onClick={() => handleNavigate('info')}
          >
            <Info size={18} />
            <span>{t.menuInfo}</span>
          </button>

          <button 
            className={`menu-item ${currentView === 'history' ? 'active' : ''}`}
            onClick={() => handleNavigate('history')}
          >
            <BookOpen size={18} />
            <span>{t.menuHistory}</span>
          </button>

          <button 
            className={`menu-item ${currentView === 'htmlHistory' ? 'active' : ''}`}
            onClick={() => handleNavigate('htmlHistory')}
          >
            <BookOpen size={18} />
            <span>{t.menuHtmlHistory}</span>
          </button>

          <button 
            className="menu-item"
            onClick={() => {
              onClose();
              onOpenStats();
            }}
          >
            <BarChart3 size={18} />
            <span>{t.menuStats}</span>
          </button>

          <button 
            className="menu-item"
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
          >
            <HelpCircle size={18} />
            <span>{t.menuAbout}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavMenu;

import React from 'react';
import { Landmark, Globe, Coins, Map } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  setView: (view: string) => void;
  language: 'en' | 'ru';
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, language }) => {
  // Helper to check if map view is active
  const isMapActive = currentView === 'olympicsMap' || currentView === 'countriesMap';

  return (
    <nav className="bottom-nav">
      <button 
        className={`bottom-nav-item ${currentView === 'olympics' ? 'active' : ''}`}
        onClick={() => setView('olympics')}
      >
        <Landmark size={20} />
        <span>{language === 'en' ? 'Olympics' : 'Олимпиады'}</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentView === 'countries' ? 'active' : ''}`}
        onClick={() => setView('countries')}
      >
        <Globe size={20} />
        <span>{language === 'en' ? 'Countries' : 'Страны'}</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentView === 'coins' ? 'active' : ''}`}
        onClick={() => setView('coins')}
      >
        <Coins size={20} />
        <span>{language === 'en' ? 'Coins' : 'Монеты'}</span>
      </button>

      <button 
        className={`bottom-nav-item ${isMapActive ? 'active' : ''}`}
        onClick={() => {
          // If we were on countriesMap, keep it, otherwise navigate to default olympicsMap
          if (currentView === 'countriesMap') {
            setView('countriesMap');
          } else {
            setView('olympicsMap');
          }
        }}
      >
        <Map size={20} />
        <span>{language === 'en' ? 'Map' : 'Карта'}</span>
      </button>
    </nav>
  );
};

export default BottomNav;

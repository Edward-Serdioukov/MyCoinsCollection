import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { translations } from '../App';
import coinsData from '../data/coins.json';
import imagesData from '../data/images.json';
import { getAssetPath } from '../utils/pathHelper';

interface OlympicGridProps {
  language: 'en' | 'ru';
  onSelectOlympic: (oly: any) => void;
}

const OlympicGrid: React.FC<OlympicGridProps> = ({ language, onSelectOlympic }) => {
  const [activeTab, setActiveTab] = useState(0);
  const t = translations[language];

  // Group coins by code to compute badges
  const codeCounts: Record<string, number> = {};
  coinsData.forEach(coin => {
    if (coin.code) {
      codeCounts[coin.code] = (codeCounts[coin.code] || 0) + 1;
    }
  });

  // Silver coins set
  const silverCodes = new Set(
    coinsData
      .filter(c => c.composition && c.composition.toLowerCase().includes('silver'))
      .map(c => c.code)
  );

  // Tabs structure
  const tabs = [
    { id: 0, label: language === 'en' ? 'All' : 'Все' },
    { id: 1, label: t.tabOwnerCoinExists, color: 'var(--accent-emerald)' },
    { id: 2, label: t.tabOwnerCoinMissing, color: 'var(--accent-orange)' },
    { id: 3, label: t.tabNoCoinsAtAll, color: 'var(--accent-rose)' },
    { id: 4, label: t.tabSilverCoinExists, color: 'var(--accent-silver)' },
    { id: 5, label: t.tabNoSilverCoin, color: 'var(--text-muted)' },
  ];

  // Filtering logic
  const filteredOlympics = imagesData.filter(oly => {
    switch (activeTab) {
      case 1:
        return oly.color === 'green';
      case 2:
        return oly.color === 'yellow';
      case 3:
        return oly.color === 'red';
      case 4:
        return silverCodes.has(oly.code);
      case 5:
        return !silverCodes.has(oly.code);
      case 0:
      default:
        return true;
    }
  });

  return (
    <div>
      {/* Tabs */}
      <div className="tab-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id > 0 && <Award size={14} style={{ color: tab.color }} />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="cards-grid">
        {filteredOlympics.map((oly, index) => {
          const count = codeCounts[oly.code] || 0;
          let borderClass = '';
          if (oly.color === 'green') borderClass = 'indicator-border-green';
          if (oly.color === 'yellow') borderClass = 'indicator-border-yellow';
          if (oly.color === 'red') borderClass = 'indicator-border-red';

          return (
            <div
              key={oly.code || index}
              className={`card ${borderClass}`}
              onClick={() => onSelectOlympic(oly)}
            >
              <img
                src={getAssetPath(oly.src)}
                alt={oly.title}
                className="card-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/icons/placeholder.png';
                }}
              />
              <div className="card-title">{oly.title}</div>
              <div className="badge">
                {count} {language === 'en' ? 'coins' : 'монет'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OlympicGrid;

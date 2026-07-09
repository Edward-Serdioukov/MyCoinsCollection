import React from 'react';
import coinsData from '../data/coins.json';
import countriesData from '../data/countries.json';
import { getAssetPath } from '../utils/pathHelper';

interface CountryGridProps {
  language: 'en' | 'ru';
  onSelectCountry: (country: any) => void;
}

const CountryGrid: React.FC<CountryGridProps> = ({ language, onSelectCountry }) => {
  // Count coins per country
  const countryCounts: Record<string, number> = {};
  coinsData.forEach(coin => {
    if (coin.country) {
      const cLower = coin.country.toLowerCase();
      countryCounts[cLower] = (countryCounts[cLower] || 0) + 1;
    }
  });

  return (
    <div className="cards-grid">
      {countriesData.map((c, index) => {
        const key = c.country ? c.country.toLowerCase() : '';
        const count = countryCounts[key] || 0;

        return (
          <div
            key={c.country || index}
            className="card"
            onClick={() => onSelectCountry(c)}
          >
            <img
              src={getAssetPath(c.src)}
              alt={c.title}
              className="card-img"
              style={{ borderRadius: '4px', border: '1px solid var(--border-color)' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/icons/placeholder.png';
              }}
            />
            <div className="card-title">{c.title}</div>
            <div className="badge">
              {count} {language === 'en' ? 'coins' : 'монет'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountryGrid;

import React from 'react';
import { X } from 'lucide-react';
import { translations } from '../App';
import coinsData from '../data/coins.json';
import imagesData from '../data/images.json';
import countriesData from '../data/countries.json';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ru';
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const t = translations[language];

  // Calculate statistics
  const totalCoins = coinsData.length;
  const totalOlympics = imagesData.length;
  const totalCountries = countriesData.length;

  const tokensCount = coinsData.filter(coin => 
    coin.title.toLowerCase().includes('token')
  ).length;

  const actualCoinsCount = totalCoins - tokensCount;

  // Silver logic
  const silverCoins = coinsData.filter(coin => 
    coin.composition && coin.composition.toLowerCase().includes('silver')
  );
  
  const silverCoinsCodes = new Set(silverCoins.map(coin => coin.code));
  
  const silverOlympicsCount = imagesData.filter(oly => 
    silverCoinsCodes.has(oly.code)
  ).length;

  const silverCoinsCount = silverCoins.length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t.statsTitle}</h2>
          <button className="action-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <table className="stats-table">
            <thead>
              <tr>
                <th>{language === 'en' ? 'Metric' : 'Показатель'}</th>
                <th>{language === 'en' ? 'Value' : 'Значение'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{t.statsCoins}</td>
                <td>{actualCoinsCount}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{t.statsOlympics}</td>
                <td>{totalOlympics}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{t.statsCountries}</td>
                <td>{totalCountries}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{t.statsSilverOlympics}</td>
                <td>{silverOlympicsCount}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{t.statsSilverCoins}</td>
                <td>{silverCoinsCount}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{t.statsTokens}</td>
                <td>{tokensCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button className="primary-btn" onClick={onClose}>
            {t.commonClose}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;

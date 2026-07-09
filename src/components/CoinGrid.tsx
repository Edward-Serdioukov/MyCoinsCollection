import React, { useState } from 'react';
import { Eye, RotateCw } from 'lucide-react';
import { translations } from '../App';
import coinsData from '../data/coins.json';
import { getAssetPath } from '../utils/pathHelper';

interface CoinGridProps {
  language: 'en' | 'ru';
  onSelectCoin: (coin: any) => void;
}

const CoinGrid: React.FC<CoinGridProps> = ({ language, onSelectCoin }) => {
  const [activeTab, setActiveTab] = useState(0);
  // Track which coin cards are flipped
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const t = translations[language];

  // Filters list
  const tabs = [
    { id: 0, label: language === 'en' ? 'All' : 'Все' },
    { id: 1, label: t.filterSilver },
    { id: 2, label: t.filterEuro },
    { id: 3, label: t.filterToken },
  ];

  // Filtering
  const filteredCoins = coinsData.filter(coin => {
    switch (activeTab) {
      case 1:
        return coin.composition && coin.composition.toLowerCase().includes('silver');
      case 2:
        return coin.title && coin.title.toLowerCase().includes('euro');
      case 3:
        return coin.title && coin.title.toLowerCase().includes('token');
      case 0:
      default:
        return true;
    }
  });

  const handleCardClick = (coinSrc: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [coinSrc]: !prev[coinSrc]
    }));
  };

  return (
    <div>
      {/* Tabs */}
      <div className="tab-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id);
              setFlippedCards({}); // Reset flips on tab change
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Grid with Touch-Friendly Flip Cards */}
      <div className="cards-grid">
        {filteredCoins.map((coin, index) => {
          const isFlipped = !!flippedCards[coin.src1];

          return (
            <div 
              key={coin.src1 || index} 
              className="coin-card-wrapper"
              onClick={() => handleCardClick(coin.src1)}
            >
              <div className={`coin-card-inner ${isFlipped ? 'flipped' : ''}`}>
                {/* Front Side */}
                <div className="coin-card-front">
                  {/* Flip Hint */}
                  <div className="flip-hint" title="Tap to flip">
                    <RotateCw size={13} />
                  </div>

                  <img
                    src={getAssetPath(coin.src1)}
                    alt={coin.title}
                    className="card-img"
                    title={coin.composition}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/icons/placeholder.png';
                    }}
                  />
                  <div className="card-title" style={{ height: 'auto', margin: 0, paddingRight: '24px' }}>
                    {coin.title}
                  </div>

                  {/* Info Trigger Button */}
                  <button
                    className="card-action-overlay"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop click bubbling to avoid flipping the card
                      onSelectCoin(coin);
                    }}
                    title={language === 'en' ? 'View Details' : 'Показать детали'}
                  >
                    <Eye size={15} />
                  </button>
                </div>

                {/* Back Side */}
                <div className="coin-card-back">
                  {/* Flip Hint */}
                  <div className="flip-hint" title="Tap to flip">
                    <RotateCw size={13} />
                  </div>

                  <img
                    src={getAssetPath(coin.src2 || coin.src1)}
                    alt={`${coin.title} (Reverse)`}
                    className="card-img"
                    title={coin.composition}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/icons/placeholder.png';
                    }}
                  />
                  <div className="card-title" style={{ height: 'auto', margin: 0, paddingRight: '24px' }}>
                    {coin.title}
                  </div>

                  {/* Info Trigger Button */}
                  <button
                    className="card-action-overlay"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCoin(coin);
                    }}
                    title={language === 'en' ? 'View Details' : 'Показать детали'}
                  >
                    <Eye size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinGrid;

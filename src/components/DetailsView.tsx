import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Award, Layers } from 'lucide-react';
import coinsData from '../data/coins.json';
import ImageModal from './ImageModal';
import { getAssetPath } from '../utils/pathHelper';

interface DetailsViewProps {
  selectedItem: any;
  itemType: string; // 'olympics' | 'countries' | 'coins' | 'olympicsMap' | 'countriesMap'
  onBack: () => void;
  language: 'en' | 'ru';
}

const DetailsView: React.FC<DetailsViewProps> = ({
  selectedItem,
  itemType,
  onBack,
  language,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState('');
  const [modalCoinTitle, setModalCoinTitle] = useState('');
  const [modalCoinDesc, setModalCoinDesc] = useState('');

  if (!selectedItem) return null;

  // 1. Determine title, main image, URL link of the main card
  let mainTitle = selectedItem.title || 'No Title';
  let mainImage = '';
  let mainUrl = selectedItem.url || '';
  
  if (itemType === 'coins') {
    mainImage = selectedItem.src1;
  } else {
    mainImage = selectedItem.src;
  }

  // 2. Filter list of matching coins
  let matchingCoins: any[] = [];
  if (itemType === 'olympics' || itemType === 'olympicsMap') {
    matchingCoins = coinsData.filter(coin => coin.code === selectedItem.code);
  } else if (itemType === 'countries' || itemType === 'countriesMap') {
    matchingCoins = coinsData.filter(coin => coin.country && coin.country.toLowerCase() === selectedItem.country?.toLowerCase());
  } else if (itemType === 'coins') {
    matchingCoins = [selectedItem];
  }

  // Handle image click to open Modal
  const handleImageClick = (imgUrl: string, coin: any) => {
    setModalImgUrl(imgUrl);
    setModalCoinTitle(coin.title);
    setModalCoinDesc(coin.description || '');
    setModalOpen(true);
  };

  return (
    <div>
      {/* Back button */}
      <button 
        className="action-btn" 
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: 600 }}
      >
        <ArrowLeft size={18} />
        <span>{language === 'en' ? 'Back' : 'Назад'}</span>
      </button>

      {/* Main detail card */}
      <div className="detail-header-card">
        <img 
          src={getAssetPath(mainImage)} 
          alt={mainTitle} 
          className="detail-main-img"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/icons/placeholder.png';
          }}
        />
        <h2 className="detail-title">{mainTitle}</h2>
        {mainUrl && (
          <a 
            href={mainUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="detail-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <span>{itemType === 'olympics' || itemType === 'olympicsMap' ? selectedItem.games || mainTitle : mainTitle}</span>
            <ExternalLink size={14} />
          </a>
        )}
        {!mainUrl && (itemType === 'olympics' || itemType === 'olympicsMap') && (
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{selectedItem.games}</span>
        )}
      </div>

      {/* Matching coins gallery */}
      <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {language === 'en' ? 'Collection Coins' : 'Монеты коллекции'} ({matchingCoins.length})
      </h3>

      <div className="details-coins-list">
        {matchingCoins.map((coin, idx) => {
          return (
            <div key={coin.src1 || idx} className="detail-coin-card">
              {/* Coin Faces Side-by-Side */}
              <div className="detail-coin-images">
                <div 
                  className="detail-coin-img-wrapper"
                  onClick={() => handleImageClick(coin.src1, coin)}
                  title="Click to zoom Front"
                >
                  <img 
                    src={getAssetPath(coin.src1)} 
                    alt={`${coin.title} Front`} 
                    className="detail-coin-thumb"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/icons/placeholder.png'; }}
                  />
                </div>
                <div 
                  className="detail-coin-img-wrapper"
                  onClick={() => handleImageClick(coin.src2 || coin.src1, coin)}
                  title="Click to zoom Back"
                >
                  <img 
                    src={getAssetPath(coin.src2 || coin.src1)} 
                    alt={`${coin.title} Back`} 
                    className="detail-coin-thumb"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/icons/placeholder.png'; }}
                  />
                </div>
              </div>

              {/* Specs Rows */}
              <div className="specs-container">
                <div className="spec-row">
                  <div className="spec-row-name">
                    <Award size={14} style={{ color: 'var(--accent-gold)' }} />
                    <span>{language === 'en' ? 'Denomination' : 'Номинал'}</span>
                  </div>
                  <div className="spec-row-val">{coin.title}</div>
                </div>
                <div className="spec-row">
                  <div className="spec-row-name">
                    <Layers size={14} style={{ color: 'var(--accent-blue)' }} />
                    <span>{language === 'en' ? 'Composition' : 'Сплав'}</span>
                  </div>
                  <div className="spec-row-val" style={{ fontSize: '0.8rem' }}>{coin.composition || 'N/A'}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-res Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={modalImgUrl}
        title={modalCoinTitle}
        description={modalCoinDesc}
        language={language}
      />
    </div>
  );
};

export default DetailsView;

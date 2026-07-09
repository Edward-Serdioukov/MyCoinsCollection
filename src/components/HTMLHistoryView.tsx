import React from 'react';

interface HTMLHistoryViewProps {
  language: 'en' | 'ru';
  setLanguage: (lang: 'en' | 'ru') => void;
}

const HTMLHistoryView: React.FC<HTMLHistoryViewProps> = ({ language, setLanguage }) => {
  return (
    <div>
      {/* Language switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          className={`primary-btn ${language === 'ru' ? '' : 'action-btn'}`}
          onClick={() => setLanguage('ru')}
          style={language === 'ru' ? {} : { border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
        >
          Русский
        </button>
        <button 
          className={`primary-btn ${language === 'en' ? '' : 'action-btn'}`}
          onClick={() => setLanguage('en')}
          style={language === 'en' ? {} : { border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
        >
          English
        </button>
      </div>

      {/* Embedded Iframe */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <iframe
          src={`/olympic_coins_history_${language}.html`}
          title="Olympic Coins History HTML"
          style={{
            width: '100%',
            height: 'calc(100vh - 220px)',
            border: 'none',
            display: 'block',
            backgroundColor: '#ffffff'
          }}
        />
      </div>
    </div>
  );
};

export default HTMLHistoryView;

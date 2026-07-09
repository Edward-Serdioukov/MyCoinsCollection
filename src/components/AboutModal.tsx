import React from 'react';
import { X, Mail } from 'lucide-react';
import { translations } from '../App';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ru';
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t.aboutTitle}</h2>
          <button className="action-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
          <img 
            src="/icons/logo1.png" 
            alt="My Coins Logo" 
            style={{ width: '160px', height: '160px', objectFit: 'contain', borderRadius: '16px' }}
            onError={(e) => {
              // fallback if upper casing is used in bundle
              (e.target as HTMLImageElement).src = '/Icons/logo1.png';
            }}
          />
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem' }}>
              {t.aboutMyCollection}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              v1.0.0 • React + Capacitor
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Mail size={16} color="var(--accent-blue)" />
            <a 
              href="mailto:mycoins92@gmail.com" 
              style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontWeight: 600, fontSize: '0.95rem' }}
            >
              mycoins92@gmail.com
            </a>
          </div>
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

export default AboutModal;

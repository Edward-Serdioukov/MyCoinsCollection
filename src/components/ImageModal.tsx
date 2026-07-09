import React from 'react';
import { X } from 'lucide-react';
import { translations } from '../App';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
  language: 'en' | 'ru';
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  language,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  // If description is empty, show default placeholder text
  const descText = description || (language === 'en' ? "No description available." : "Описание отсутствует.");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '600px' }}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="action-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div 
          className="modal-body" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1.5rem',
            overflowY: 'auto'
          }}
        >
          <img 
            src={imageUrl} 
            alt={title} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '300px', 
              objectFit: 'contain',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '0.5rem'
            }}
            onError={(e) => {
              // Handle relative paths that might require lowering or prepending
              const target = e.target as HTMLImageElement;
              if (target.src.includes('Coins/')) {
                target.src = target.src.replace('Coins/', 'coins/');
              } else if (target.src.includes('Icons/')) {
                target.src = target.src.replace('Icons/', 'icons/');
              }
            }}
          />
          <div style={{ width: '100%' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              {language === 'en' ? 'Description:' : 'Описание:'}
            </h4>
            <p style={{ 
              fontSize: '0.95rem', 
              lineHeight: 1.6, 
              color: 'var(--text-main)', 
              whiteSpace: 'pre-wrap',
              textAlign: 'left'
            }}>
              {descText}
            </p>
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

export default ImageModal;

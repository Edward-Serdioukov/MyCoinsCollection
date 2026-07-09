import React, { useEffect, useState } from 'react';
import historyEn from '../data/coins_history_en.md?raw';
import historyRu from '../data/coins_history_ru.md?raw';

interface HistoryViewProps {
  language: 'en' | 'ru';
  setLanguage: (lang: 'en' | 'ru') => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ language, setLanguage }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Select raw markdown content
    if (language === 'ru') {
      setContent(historyRu);
    } else {
      setContent(historyEn);
    }
  }, [language]);

  // A simple, robust markdown parser for the history page structure
  const parseMarkdown = (text: string) => {
    // Split by lines
    const lines = text.split('\n');
    const parsedElements: React.ReactNode[] = [];

    let listItems: React.ReactNode[] = [];

    const commitList = (key: string) => {
      if (listItems.length > 0) {
        parsedElements.push(
          <ol key={key} style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            {listItems}
          </ol>
        );
        listItems = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      
      // Ignore HTML comments and empty lines
      if (!trimmed || trimmed.startsWith('<!--')) {
        return;
      }

      // Commit lists if we hit headers or images
      const isHeader = trimmed.startsWith('#');
      const isImg = trimmed.startsWith('![') || trimmed.startsWith('<img');
      const isRule = trimmed === '---';
      
      if (isHeader || isImg || isRule) {
        commitList(`list-end-${idx}`);
      }

      if (isHeader) {
        if (trimmed.startsWith('# ')) {
          parsedElements.push(<h1 key={idx}>{trimmed.substring(2)}</h1>);
        } else if (trimmed.startsWith('## ')) {
          parsedElements.push(<h2 key={idx}>{trimmed.substring(3)}</h2>);
        } else if (trimmed.startsWith('### ')) {
          parsedElements.push(<h3 key={idx}>{trimmed.substring(4)}</h3>);
        }
      } else if (isRule) {
        parsedElements.push(<hr key={idx} />);
      } else if (isImg) {
        // Extract image source and alternate titles
        let src = '';
        let alt = '';
        
        if (trimmed.startsWith('![')) {
          // MD: ![AltText](/path/to/image.png "Title")
          const srcMatch = trimmed.match(/\((.*?)\)/);
          const altMatch = trimmed.match(/!\[(.*?)\]/);
          if (srcMatch) {
            src = srcMatch[1].split(' ')[0]; // ignore title quotes if present
          }
          if (altMatch) {
            alt = altMatch[1];
          }
        } else if (trimmed.startsWith('<img')) {
          // HTML: <img src="/path" ...>
          const srcMatch = trimmed.match(/src=["'](.*?)["']/);
          const altMatch = trimmed.match(/alt=["'](.*?)["']/);
          if (srcMatch) {
            src = srcMatch[1];
          }
          if (altMatch) {
            alt = altMatch[1];
          }
        }

        // Normalize path: replace leading / if necessary to make it relative to root public/
        if (src.startsWith('/')) {
          src = src.substring(1);
        }

        parsedElements.push(
          <div key={idx} className="history-image-container">
            <img 
              src={src} 
              alt={alt} 
              className="history-inline-img" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.includes('coins/')) {
                  target.src = target.src.replace('coins/', 'Coins/');
                } else {
                  target.src = '/icons/placeholder.png';
                }
              }}
            />
          </div>
        );
      } else {
        // Normal text block or list item
        // Check if list item (starts with a number like "1." or "2. ")
        const listMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        
        // Clean bold marks: **text** -> bold
        const renderTextWithFormatting = (txt: string) => {
          // Replace markdown double asterisks **text** with bold tags
          const parts = txt.split('**');
          return parts.map((part, i) => {
            if (i % 2 === 1) {
              return <strong key={i}>{part}</strong>;
            }
            return part;
          });
        };

        if (listMatch) {
          listItems.push(
            <li key={idx} style={{ marginBottom: '0.5rem' }}>
              {renderTextWithFormatting(listMatch[2])}
            </li>
          );
        } else {
          commitList(`text-commit-${idx}`);
          parsedElements.push(
            <p key={idx}>
              {renderTextWithFormatting(trimmed)}
            </p>
          );
        }
      }
    });

    // Commit any dangling list items
    commitList('list-final');

    return parsedElements;
  };

  return (
    <div>
      {/* Language Switch Row */}
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

      {/* History content container */}
      <div className="history-container">
        <div className="history-md">
          {parseMarkdown(content)}
        </div>
      </div>
    </div>
  );
};

export default HistoryView;

import { useState, useEffect } from 'react';
import Header from './components/Header';
import NavMenu from './components/NavMenu';
import OlympicGrid from './components/OlympicGrid';
import CountryGrid from './components/CountryGrid';
import CoinGrid from './components/CoinGrid';
import DetailsView from './components/DetailsView';
import HistoryView from './components/HistoryView';
import HTMLHistoryView from './components/HTMLHistoryView';
import MapView from './components/MapView';
import StatsModal from './components/StatsModal';
import AboutModal from './components/AboutModal';
import BottomNav from './components/BottomNav';
import { ExternalLink, Info } from 'lucide-react';

// Export translations for subcomponents
export const translations = {
  en: {
    appTitle: "OCC",
    menuOlympics: "View: Olympics",
    menuCountries: "View: Countries",
    menuCoins: "View: Coins",
    menuMaps: "View: Maps...",
    submenuOlympicsMap: "Olympics Map",
    submenuCountriesMap: "Countries Map",
    menuInfo: "Information",
    menuHistory: "History of Olympic Coins",
    menuHtmlHistory: "History (HTML)",
    menuStats: "Statistics",
    menuAbout: "About",
    filterAll: "All",
    filterSilver: "Silver",
    filterEuro: "Euro",
    filterToken: "Token",
    statsTitle: "Statistics",
    statsCoins: "Coins (excl. tokens)",
    statsOlympics: "Olympics",
    statsCountries: "Countries",
    statsSilverOlympics: "Silver Olympics",
    statsSilverCoins: "Silver Coins",
    statsTokens: "Tokens",
    aboutTitle: "About",
    aboutMyCollection: "My Coins Collection",
    commonClose: "Close",
    aboutText: "My coins collection",
    aboutEmail: "e-mail: mycoins92@gmail.com",
    tabOwnerCoinExists: "Owner Coin Exists",
    tabOwnerCoinMissing: "Owner Coin Missing",
    tabNoCoinsAtAll: "No Coins",
    tabSilverCoinExists: "Silver Coin Exists",
    tabNoSilverCoin: "No Silver Coin",
  },
  ru: {
    appTitle: "OCC",
    menuOlympics: "Вид: Олимпиады",
    menuCountries: "Вид: Страны",
    menuCoins: "Вид: Монеты",
    menuMaps: "Вид: Карты...",
    submenuOlympicsMap: "Карта Олимпиад",
    submenuCountriesMap: "Карта Стран",
    menuInfo: "Информация",
    menuHistory: "История олимпийских монет",
    menuHtmlHistory: "История (HTML)",
    menuStats: "Статистика",
    menuAbout: "О программе",
    filterAll: "Все",
    filterSilver: "Серебро",
    filterEuro: "Евро",
    filterToken: "Токен",
    statsTitle: "Статистика",
    statsCoins: "Монеты (без токенов)",
    statsOlympics: "Олимпиады",
    statsCountries: "Страны",
    statsSilverOlympics: "Олимпиады (серебро)",
    statsSilverCoins: "Монеты (серебро)",
    statsTokens: "Токены",
    aboutTitle: "О программе",
    aboutMyCollection: "Моя коллекция монет",
    commonClose: "Закрыть",
    aboutText: "Моя коллекция монет",
    aboutEmail: "e-mail: mycoins92@gmail.com",
    tabOwnerCoinExists: "Монета владельца есть",
    tabOwnerCoinMissing: "Монеты владельца нет",
    tabNoCoinsAtAll: "Монет нет вообще",
    tabSilverCoinExists: "Есть серебряная монета",
    tabNoSilverCoin: "Нет серебряной монеты",
  }
};

interface HistoryState {
  view: string;
  selectedItem: any;
  itemType: string;
}

function App() {
  // Navigation & States
  const [view, setView] = useState<string>('olympics');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [itemType, setItemType] = useState<string>('');
  const [historyStack, setHistoryStack] = useState<HistoryState[]>([]);

  // Menu, stats, about modals
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Settings
  const [language, setLanguage] = useState<'en' | 'ru'>(() => {
    return (localStorage.getItem('lang') as 'en' | 'ru') || 'en';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Sync theme attribute & settings
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  // Navigate helper
  const navigateTo = (newView: string, item: any = null, type: string = '') => {
    setHistoryStack(prev => [...prev, { view, selectedItem, itemType }]);
    setView(newView);
    setSelectedItem(item);
    setItemType(type);
  };

  // Back helper
  const handleBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack(prevStack => prevStack.slice(0, -1));
      setView(prev.view);
      setSelectedItem(prev.selectedItem);
      setItemType(prev.itemType);
    } else {
      // Fallback
      setView('olympics');
      setSelectedItem(null);
      setItemType('');
    }
  };

  const handleHomeClick = () => {
    setHistoryStack([]);
    setView('olympics');
    setSelectedItem(null);
    setItemType('');
  };

  // Useful links definition
  const usefulLinks = [
    { label: "Olympic Games Information", url: "https://olympics.com/en/" },
    { label: "Winter Olympic coins", url: "https://en.wikipedia.org/wiki/Winter_Olympic_coins" },
    { label: "Summer Olympic coins", url: "https://en.wikipedia.org/wiki/Summer_Olympic_coins" },
    { label: "Numista, coin & token catalog", url: "https://en.numista.com/" },
    { label: "uCoin, coin catalog", url: "https://en.ucoin.net/" },
    { label: "Collector and commemorative coins", url: "https://www.coin-database.com/" },
    { label: "Colnect, coin catalog", url: "https://colnect.com/en/coins" },
    { label: "Coin grading", url: "https://en.wikipedia.org/wiki/Coin_grading" },
  ];

  return (
    <div className="app-container">
      {/* Header persistent app bar */}
      <Header
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        onMenuOpen={() => setIsMenuOpen(true)}
        onHomeClick={handleHomeClick}
      />

      {/* Slide drawer menu */}
      <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentView={view}
        setView={(v) => navigateTo(v)}
        language={language}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main content body */}
      <main className="main-content">
        {view === 'olympics' && (
          <OlympicGrid
            language={language}
            onSelectOlympic={(oly) => navigateTo('details', oly, 'olympics')}
          />
        )}

        {view === 'countries' && (
          <CountryGrid
            language={language}
            onSelectCountry={(c) => navigateTo('details', c, 'countries')}
          />
        )}

        {view === 'coins' && (
          <CoinGrid
            language={language}
            onSelectCoin={(coin) => navigateTo('details', coin, 'coins')}
          />
        )}

        {view === 'details' && (
          <DetailsView
            selectedItem={selectedItem}
            itemType={itemType}
            onBack={handleBack}
            language={language}
          />
        )}

        {view === 'info' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Info size={24} color="var(--accent-blue)" />
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem' }}>
                {language === 'en' ? 'Useful Information' : 'Полезная Информация'}
              </h2>
            </div>
            <div className="info-list">
              {usefulLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="info-tile"
                >
                  <span className="info-tile-title">{link.label}</span>
                  <ExternalLink size={16} color="var(--text-muted)" />
                </a>
              ))}
            </div>
          </div>
        )}

        {view === 'history' && (
          <HistoryView
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {view === 'htmlHistory' && (
          <HTMLHistoryView
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {(view === 'olympicsMap' || view === 'countriesMap') && (
          <MapView
            mapType={view === 'olympicsMap' ? 'olympics' : 'countries'}
            language={language}
            onSelectItem={(item, type) => navigateTo('details', item, type)}
          />
        )}
      </main>

      {/* Statistics Modal Overlay */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        language={language}
      />

      {/* About Modal Overlay */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        language={language}
      />

      {/* Bottom Navigation Bar */}
      <BottomNav
        currentView={view}
        setView={(v) => navigateTo(v)}
        language={language}
      />
    </div>
  );
}

export default App;

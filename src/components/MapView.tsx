import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Landmark, Globe } from 'lucide-react';
import imagesData from '../data/images.json';
import countriesData from '../data/countries.json';

interface MapViewProps {
  mapType: 'olympics' | 'countries';
  language: 'en' | 'ru';
  onSelectItem: (item: any, type: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ mapType, language, onSelectItem }) => {
  // Center coordinates (Europe focus as starting zoom)
  const defaultCenter: [number, number] = [48, 10];
  const defaultZoom = 3;

  // Render Olympics Map
  if (mapType === 'olympics') {
    return (
      <div className="map-view-wrapper">
        <MapContainer 
          center={defaultCenter} 
          zoom={defaultZoom} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {imagesData
            .filter(oly => oly.coordinates && oly.coordinates.lat !== undefined && oly.coordinates.lon !== undefined)
            .map((oly, index) => {
              const isSummer = oly.code?.endsWith('s');
              
              // Custom Leaflet pin icon based on season
              const pinIcon = L.icon({
                iconUrl: isSummer ? '/icons/location2-red.png' : '/icons/location2.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
                className: 'custom-map-pin'
              });

              const position: [number, number] = [oly.coordinates.lat, oly.coordinates.lon];

              return (
                <Marker 
                  key={oly.code || index} 
                  position={position} 
                  icon={pinIcon}
                >
                  <Popup className="custom-leaflet-popup">
                    <div style={{ textAlign: 'center', fontFamily: 'var(--font-main)' }}>
                      <h4 style={{ fontWeight: 800, margin: '0.25rem 0' }}>{oly.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        {oly.games}
                      </p>
                      <button 
                        className="primary-btn" 
                        style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                        onClick={() => onSelectItem(oly, 'olympicsMap')}
                      >
                        <Landmark size={12} />
                        <span>{language === 'en' ? 'Details' : 'Детали'}</span>
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    );
  }

  // Render Countries Map
  return (
    <div className="map-view-wrapper">
      <MapContainer 
        center={[47, 13]} 
        zoom={3.5} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countriesData
          .filter(c => c.coordinates && c.coordinates.latitude !== undefined && c.coordinates.longitude !== undefined)
          .map((c, index) => {
            const avatarUrl = c.avatar || '/icons/default_country_marker.png';

            // Custom Leaflet circular country flag pin icon
            const countryIcon = L.icon({
              iconUrl: avatarUrl,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
              popupAnchor: [0, -14],
              className: 'custom-country-pin'
            });

            const position: [number, number] = [c.coordinates.latitude, c.coordinates.longitude];

            return (
              <Marker 
                key={c.country || index} 
                position={position} 
                icon={countryIcon}
              >
                <Popup className="custom-leaflet-popup">
                  <div style={{ textAlign: 'center', fontFamily: 'var(--font-main)' }}>
                    <h4 style={{ fontWeight: 800, margin: '0.25rem 0' }}>{c.title}</h4>
                    <button 
                      className="primary-btn" 
                      style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}
                      onClick={() => onSelectItem(c, 'countriesMap')}
                    >
                      <Globe size={12} />
                      <span>{language === 'en' ? 'Details' : 'Детали'}</span>
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapView;

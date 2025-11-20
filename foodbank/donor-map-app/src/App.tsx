import { useState, useMemo } from 'react';
import DonorMap from './components/DonorMap';
import FilterControls from './components/FilterControls';
import type { DonorType, DonorData } from './types/donor';
import donorDataRaw from './data/donors.json';
import './App.css';

const donorData = donorDataRaw as DonorData;

function App() {
  const [selectedType, setSelectedType] = useState<DonorType>('All');
  const [mapActions, setMapActions] = useState<{
    zoomToType: (type: string) => void;
    fitAllMarkers: () => void;
  } | null>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // Filter donors based on selected type
  const filteredDonors = useMemo(() => {
    if (selectedType === 'All') {
      return donorData.donors;
    }
    return donorData.donors.filter(donor => donor.type === selectedType);
  }, [selectedType]);

  // Calculate donor counts by type
  const donorCounts = useMemo(() => {
    return {
      government: donorData.donors.filter(d => d.type === 'Government').length,
      corporate: donorData.donors.filter(d => d.type === 'Corporate').length,
      individual: donorData.donors.filter(d => d.type === 'Individual').length,
      total: donorData.donors.length,
    };
  }, []);

  if (!mapboxToken) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#DC2626', marginBottom: '16px' }}>⚠️ Mapbox 토큰이 없습니다</h2>
          <p style={{ color: '#6B7280', marginBottom: '16px' }}>
            프로젝트 루트에 <code>.env</code> 파일을 생성하고 Mapbox 토큰을 추가해주세요:
          </p>
          <pre style={{
            backgroundColor: '#f3f4f6',
            padding: '12px',
            borderRadius: '4px',
            textAlign: 'left',
            fontSize: '14px',
            overflow: 'auto'
          }}>
            VITE_MAPBOX_TOKEN=your_mapbox_token_here
          </pre>
          <p style={{ color: '#6B7280', marginTop: '16px', fontSize: '14px' }}>
            토큰 발급:{' '}
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3B82F6', textDecoration: 'underline' }}
            >
              Mapbox 대시보드
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            🏦 광명시 푸드뱅크
          </h1>
          <p className="app-subtitle">후원자 위치 지도</p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-value">{donorCounts.total}</span>
            <span className="stat-label">전체 후원자</span>
          </div>
          <div className="stat">
            <span className="stat-value">{filteredDonors.filter(d => d.coordinates).length}</span>
            <span className="stat-label">지도 표시</span>
          </div>
        </div>
      </header>

      {/* Demo Disclaimer Banner */}
      <div className="disclaimer-banner">
        <span className="disclaimer-icon">ℹ️</span>
        <span className="disclaimer-text">
          이 앱은 데모용이며, 표시된 데이터는 실제 데이터가 아닌 가상의 샘플 데이터입니다.
        </span>
      </div>

      <div className="filter-section">
        <FilterControls
          selectedType={selectedType}
          onFilterChange={setSelectedType}
          donorCounts={donorCounts}
          mapActions={mapActions}
        />
      </div>

      <div className="map-container">
        <DonorMap
          donors={filteredDonors}
          mapboxToken={mapboxToken}
          onMapReady={setMapActions}
        />
      </div>

      <footer className="app-footer">
        <p>
          데이터 최종 업데이트: {new Date(donorData.metadata.lastUpdated).toLocaleDateString('ko-KR')}
        </p>
        <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
          Mapbox GL JS • React • TypeScript 기반
        </p>
      </footer>
    </div>
  );
}

export default App;

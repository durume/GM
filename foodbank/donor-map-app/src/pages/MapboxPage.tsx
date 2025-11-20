import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorMap from '../components/DonorMap';
import FilterControls from '../components/FilterControls';
import type { DonorType, DonorData } from '../types/donor';
import donorDataRaw from '../data/donors.json';

const donorData = donorDataRaw as DonorData;

const MapboxPage = () => {
  const [selectedType, setSelectedType] = useState<DonorType>('All');
  const [mapActions, setMapActions] = useState<{
    zoomToType: (type: string) => void;
    fitAllMarkers: () => void;
  } | null>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const navigate = useNavigate();

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
          <p style={{ color: '#6B7280' }}>Mapbox 토큰을 설정해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1F2937' }}>
            🏦 광명시 푸드뱅크 - Mapbox 3D
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6B7280' }}>
            후원자 위치 지도 (3D 지형 지원)
          </p>
        </div>
        <button
          onClick={() => navigate('/kakao')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#FEE500',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDD835'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE500'}
        >
          🗺️ 카카오맵으로 보기
        </button>
      </header>

      {/* Demo Disclaimer Banner */}
      <div style={{
        backgroundColor: '#EFF6FF',
        borderBottom: '1px solid #BFDBFE',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <span style={{ fontSize: '20px' }}>ℹ️</span>
        <span style={{ fontSize: '14px', color: '#1E40AF' }}>
          이 앱은 데모용이며, 표시된 데이터는 실제 데이터가 아닌 가상의 샘플 데이터입니다.
        </span>
      </div>

      <div style={{ padding: '16px 24px', backgroundColor: '#F9FAFB' }}>
        <FilterControls
          selectedType={selectedType}
          onFilterChange={setSelectedType}
          donorCounts={donorCounts}
          mapActions={mapActions}
        />
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <DonorMap
          donors={filteredDonors}
          mapboxToken={mapboxToken}
          onMapReady={setMapActions}
        />
      </div>
    </div>
  );
};

export default MapboxPage;

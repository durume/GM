import { useNavigate } from 'react-router-dom';
import KakaoMap from '../components/KakaoMap';
import type { DonorData } from '../types/donor';
import donorDataRaw from '../data/donors.json';

const donorData = donorDataRaw as DonorData;

const KakaoPage = () => {
  const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  if (!kakaoApiKey) {
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
          <h2 style={{ color: '#DC2626', marginBottom: '16px' }}>⚠️ 카카오 API 키가 없습니다</h2>
          <p style={{ color: '#6B7280' }}>카카오 API 키를 설정해주세요.</p>
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
            🏦 광명시 푸드뱅크 - 카카오맵
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6B7280' }}>
            후원자 위치 지도 (한국 주소 최적화)
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3B82F6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
        >
          🏔️ Mapbox 3D로 보기
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

      <div style={{ flex: 1, position: 'relative' }}>
        <KakaoMap
          donors={donorData.donors}
          kakaoApiKey={kakaoApiKey}
          apiBaseUrl={apiBaseUrl}
        />
      </div>

      <footer style={{
        backgroundColor: 'white',
        borderTop: '1px solid #E5E7EB',
        padding: '12px 24px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
          데이터 최종 업데이트: {new Date(donorData.metadata.lastUpdated).toLocaleDateString('ko-KR')} •
          Kakao Maps • React • TypeScript 기반
        </p>
      </footer>
    </div>
  );
};

export default KakaoPage;

import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const MapsPage = () => {
  return (
    <Layout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          후원자 지도
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '64px',
          lineHeight: '1.6'
        }}>
          광명푸드뱅크마켓센터를 후원해 주시는 기업과 단체의 위치를 확인하실 수 있습니다.<br/>
          원하시는 지도 형식을 선택해주세요.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {/* Mapbox 3D Map */}
          <Link
            to="/maps/mapbox"
            style={{
              textDecoration: 'none',
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#3B82F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div style={{
              backgroundColor: '#3B82F6',
              padding: '48px 32px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '72px',
                marginBottom: '16px'
              }}>🏔️</div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0
              }}>
                Mapbox 3D 지도
              </h2>
            </div>

            <div style={{ padding: '32px' }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '16px',
                color: '#4B5563',
                lineHeight: '2'
              }}>
                <li>✅ 3D 건물 및 지형 표시</li>
                <li>✅ 부드러운 줌 및 회전</li>
                <li>✅ 위성 지도 지원</li>
                <li>✅ 글로벌 지도 엔진</li>
                <li>✅ 시각적으로 화려한 표현</li>
              </ul>

              <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#EFF6FF',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#1E40AF'
              }}>
                <strong>추천:</strong> 전체적인 시각화를 원하시는 경우
              </div>
            </div>
          </Link>

          {/* Kakao Map */}
          <Link
            to="/maps/kakao"
            style={{
              textDecoration: 'none',
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#FEE500';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div style={{
              backgroundColor: '#FEE500',
              padding: '48px 32px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '72px',
                marginBottom: '16px'
              }}>🗺️</div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#000',
                margin: 0
              }}>
                카카오맵
              </h2>
            </div>

            <div style={{ padding: '32px' }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '16px',
                color: '#4B5563',
                lineHeight: '2'
              }}>
                <li>✅ 한국 주소 최적화</li>
                <li>✅ 정확한 위치 정보</li>
                <li>✅ 길찾기 기능 제공</li>
                <li>✅ 카카오맵 앱 연동</li>
                <li>✅ 익숙한 인터페이스</li>
              </ul>

              <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#FEF3C7',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#92400E'
              }}>
                <strong>추천:</strong> 정확한 위치 및 길찾기가 필요한 경우
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginTop: '48px'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            📍 후원자 정보 안내
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            lineHeight: '1.8',
            marginBottom: '16px'
          }}>
            지도에 표시된 후원자 정보는 데모용 샘플 데이터입니다.<br/>
            실제 후원자 정보는 개인정보 보호를 위해 비공개로 관리됩니다.
          </p>
          <p style={{
            fontSize: '14px',
            color: '#9CA3AF',
            margin: 0
          }}>
            후원 문의: 02-2688-1377 | gmfm1331@naver.com
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MapsPage;

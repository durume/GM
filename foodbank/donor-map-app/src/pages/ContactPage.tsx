import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const ContactPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        color: 'white',
        padding: '60px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            오시는길
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.95
          }}>
            광명푸드뱅크마켓센터를 찾아주세요
          </p>
        </div>
      </section>

      {/* Main Contact Information */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px'
      }}>
        {/* Contact Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {/* Address Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #FEF3C7',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📍</div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#D97706',
              marginBottom: '16px'
            }}>
              주소
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#1F2937',
              lineHeight: '1.8',
              marginBottom: '8px'
            }}>
              경기도 광명시 오리로 362
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6B7280'
            }}>
              (소하동 1389-3)
            </p>
          </div>

          {/* Phone Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #DBEAFE',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📞</div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#3B82F6',
              marginBottom: '16px'
            }}>
              전화
            </h3>
            <p style={{
              fontSize: '18px',
              color: '#1F2937',
              lineHeight: '1.8',
              marginBottom: '8px',
              fontWeight: 'bold'
            }}>
              02-2688-1377
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6B7280'
            }}>
              평일 09:00 - 18:00
            </p>
          </div>

          {/* Fax & Email Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #D1FAE5',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📧</div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#10B981',
              marginBottom: '16px'
            }}>
              팩스 / 이메일
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#1F2937',
              lineHeight: '1.8',
              marginBottom: '8px'
            }}>
              📠 02-2688-0453
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6B7280'
            }}>
              gmfm1331@naver.com
            </p>
          </div>
        </div>

        {/* Operating Hours */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '60px'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            운영 시간
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              backgroundColor: '#FEF3C7',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #F59E0B'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🕐</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#92400E',
                marginBottom: '12px'
              }}>
                평일
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#78350F',
                lineHeight: '1.7'
              }}>
                월요일 - 금요일<br/>
                오전 9시 - 오후 6시
              </p>
            </div>

            <div style={{
              backgroundColor: '#DBEAFE',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #3B82F6'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚫</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1E40AF',
                marginBottom: '12px'
              }}>
                휴무
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#1E3A8A',
                lineHeight: '1.7'
              }}>
                토요일, 일요일<br/>
                공휴일
              </p>
            </div>

            <div style={{
              backgroundColor: '#D1FAE5',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #10B981'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>⏰</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#065F46',
                marginBottom: '12px'
              }}>
                점심시간
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#064E3B',
                lineHeight: '1.7'
              }}>
                오후 12시 - 오후 1시<br/>
                (휴게시간)
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#FEF3C7',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#92400E'
          }}>
            💡 방문 전 전화로 일정을 확인해 주시면 더욱 원활한 상담이 가능합니다.
          </div>
        </div>

        {/* Interactive Maps Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '60px'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            인터랙티브 지도
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            지도에서 센터 위치와 주변 후원자를 확인해보세요
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Kakao Map Link */}
            <Link
              to="/maps/kakao"
              style={{
                textDecoration: 'none',
                backgroundColor: '#FEE500',
                padding: '32px',
                borderRadius: '12px',
                border: '3px solid #F5D500',
                transition: 'transform 0.3s, box-shadow 0.3s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🗺️</div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#3C1E1E',
                marginBottom: '12px'
              }}>
                카카오 지도
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#3C1E1E',
                lineHeight: '1.6'
              }}>
                카카오맵으로<br/>길 찾기
              </p>
            </Link>

            {/* Mapbox Link */}
            <Link
              to="/maps/mapbox"
              style={{
                textDecoration: 'none',
                backgroundColor: '#4264FB',
                padding: '32px',
                borderRadius: '12px',
                border: '3px solid #2E4FDB',
                transition: 'transform 0.3s, box-shadow 0.3s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🌏</div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '12px'
              }}>
                Mapbox 지도
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'white',
                lineHeight: '1.6',
                opacity: 0.95
              }}>
                글로벌 후원자<br/>지도 보기
              </p>
            </Link>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '20px',
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
            <p style={{
              fontSize: '14px',
              color: '#4B5563',
              lineHeight: '1.6'
            }}>
              후원자 지도에서 우리 지역의 나눔 참여 현황을 확인할 수 있습니다.<br/>
              여러분도 나눔의 주인공이 되어 보세요!
            </p>
          </div>
        </div>

        {/* Transportation */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '60px'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            교통편 안내
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Bus */}
            <div style={{
              backgroundColor: '#FEF3C7',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #F59E0B'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚌</div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#92400E',
                marginBottom: '16px'
              }}>
                버스
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#78350F',
                lineHeight: '1.7'
              }}>
                소하동 행정복지센터 정류장 하차<br/>
                도보 5분 거리
              </p>
            </div>

            {/* Subway */}
            <div style={{
              backgroundColor: '#DBEAFE',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #3B82F6'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚇</div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1E40AF',
                marginBottom: '16px'
              }}>
                지하철
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#1E3A8A',
                lineHeight: '1.7'
              }}>
                7호선 광명사거리역<br/>
                버스 환승 또는 도보 15분
              </p>
            </div>

            {/* Car */}
            <div style={{
              backgroundColor: '#D1FAE5',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #10B981'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚗</div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#065F46',
                marginBottom: '16px'
              }}>
                자가용
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#064E3B',
                lineHeight: '1.7'
              }}>
                주차 공간 완비<br/>
                네비게이션: 경기도 광명시 오리로 362
              </p>
            </div>
          </div>
        </div>

        {/* Organization Information */}
        <div style={{
          backgroundColor: '#1F2937',
          color: 'white',
          padding: '48px',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '56px', marginBottom: '24px' }}>🏛️</div>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            광명푸드뱅크마켓센터
          </h3>
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            marginBottom: '24px',
            lineHeight: '1.8'
          }}>
            대한적십자사봉사회광명지구협의회 위탁 운영
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            maxWidth: '800px',
            margin: '32px auto 0'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>
                운영주체
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                광명시
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>
                위탁운영
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                대한적십자사봉사회
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>
                운영시작
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                1998년
              </div>
            </div>
          </div>
        </div>

        {/* Visit Notice */}
        <div style={{
          marginTop: '60px',
          backgroundColor: '#FEF3C7',
          padding: '32px',
          borderRadius: '16px',
          border: '2px solid #F59E0B',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👋</div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#92400E',
            marginBottom: '16px'
          }}>
            방문 시 참고사항
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '15px',
              color: '#78350F',
              padding: '12px 16px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}>
              ✓ 방문 전 전화 예약을 권장합니다
            </div>
            <div style={{
              fontSize: '15px',
              color: '#78350F',
              padding: '12px 16px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}>
              ✓ 점심시간(12:00-13:00)에는 상담이 어렵습니다
            </div>
            <div style={{
              fontSize: '15px',
              color: '#78350F',
              padding: '12px 16px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}>
              ✓ 주차 공간이 제한적이니 대중교통 이용을 권장합니다
            </div>
            <div style={{
              fontSize: '15px',
              color: '#78350F',
              padding: '12px 16px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}>
              ✓ 신청 시 신분증과 관련 서류를 지참해 주세요
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

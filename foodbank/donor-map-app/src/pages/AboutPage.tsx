import Layout from '../components/Layout';

const AboutPage = () => {
  const timeline = [
    { year: '1998.04', event: '푸드뱅크 사업 실시' },
    { year: '1999.11', event: '경기도 사회복지대회 푸드뱅크 부문 최우수 푸드뱅크상 수상' },
    { year: '2000.12', event: '광명푸드마켓 개소, 경기도 사회복지협의회의 공로패 수상' },
    { year: '2003.01', event: '경기도 내 최우수 푸드뱅크 선정' },
    { year: '2009.06', event: '시립 광명푸드뱅크·마켓 「행복바구니」 1호점 개소' },
    { year: '2013.01', event: '대한적십자사봉사회광명지구협의회 위탁 운영' },
    { year: '2015.04', event: '시립 광명푸드뱅크·마켓 「행복바구니」 2호점 개소' },
    { year: '2021.12', event: '광명푸드뱅크마켓센터 통합 운영 및 명칭 변경' },
    { year: '2023.01', event: '대한적십자사봉사회광명지구협의회 재위탁 운영' },
    { year: '2023.07', event: '경기도 \'2023 올해의 푸드뱅크·마켓\' 1위 선정' },
    { year: '2024.08', event: '전국 푸드뱅크·마켓센터 최초 공정무역 실천기관\' 인증 획득' },
  ];

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
            센터소개
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.95
          }}>
            26년간 이어온 나눔의 여정
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '80px 24px'
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          광명푸드뱅크마켓센터 걸어온 길
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          1998년부터 지금까지, 지역사회와 함께한 나눔의 역사입니다
        </p>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '3px',
            backgroundColor: '#F59E0B',
            transform: 'translateX(-50%)',
            zIndex: 0
          }} />

          {/* Timeline Items */}
          {timeline.map((item, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                marginBottom: '48px',
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                zIndex: 1
              }}
            >
              <div style={{
                width: 'calc(50% - 40px)',
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '2px solid #FEF3C7',
                position: 'relative'
              }}>
                {/* Connector Dot */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  [index % 2 === 0 ? 'right' : 'left']: '-42px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#D97706',
                  borderRadius: '50%',
                  border: '4px solid white',
                  transform: 'translateY(-50%)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }} />

                {/* Year Badge */}
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  border: '1px solid #F59E0B'
                }}>
                  {item.year}
                </div>

                {/* Event Text */}
                <p style={{
                  fontSize: '15px',
                  color: '#1F2937',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Highlight */}
        <div style={{
          marginTop: '80px',
          backgroundColor: '#FEF3C7',
          padding: '40px',
          borderRadius: '16px',
          border: '2px solid #F59E0B',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#92400E',
            marginBottom: '16px'
          }}>
            주요 성과
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '32px'
          }}>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#D97706',
                marginBottom: '8px'
              }}>2023</div>
              <p style={{ fontSize: '14px', color: '#78350F', margin: 0 }}>
                경기도 올해의<br/>푸드뱅크·마켓 1위
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#D97706',
                marginBottom: '8px'
              }}>2024</div>
              <p style={{ fontSize: '14px', color: '#78350F', margin: 0 }}>
                전국 최초<br/>공정무역 실천기관 인증
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#D97706',
                marginBottom: '8px'
              }}>26년</div>
              <p style={{ fontSize: '14px', color: '#78350F', margin: 0 }}>
                푸드뱅크 사업<br/>운영 경력
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div style={{
          marginTop: '60px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            우리의 사명
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#4B5563',
            lineHeight: '1.8',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            광명푸드뱅크마켓센터는 기부받은 식품 및 생활용품을 가난하고 어려운 이웃에게 전달하는
            물적 나눔 제도를 운영하며, 대한적십자사봉사회광명지구협의회의 위탁을 받아
            지역사회의 복지 향상을 위해 최선을 다하고 있습니다.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

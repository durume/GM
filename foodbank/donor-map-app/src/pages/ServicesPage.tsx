import Layout from '../components/Layout';

const ServicesPage = () => {
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
            주요사업
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.95
          }}>
            이웃을 위한 따뜻한 나눔 활동
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          우리가 하는 일
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          광명푸드뱅크마켓센터의 세 가지 핵심 사업을 소개합니다
        </p>

        {/* Service Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {/* 푸드뱅크 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            border: '2px solid #FEF3C7',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}>
            {/* Icon/Image Section */}
            <div style={{
              backgroundColor: '#FEF3C7',
              padding: '40px',
              textAlign: 'center',
              borderBottom: '2px solid #F59E0B'
            }}>
              <div style={{ fontSize: '72px', marginBottom: '16px' }}>🚚</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#92400E',
                margin: 0
              }}>
                푸드뱅크
              </h3>
            </div>

            {/* Content Section */}
            <div style={{ padding: '32px' }}>
              <p style={{
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                푸드마켓 접근이 어려운 이웃을 위해 차량에 기부받은 물품을 싣고
                각 등 광명복지센터로 가서 <strong style={{ color: '#D97706' }}>4-6가지의 식자재 및 생활용품</strong>을 제공합니다.
              </p>
              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#374151'
              }}>
                <div style={{ marginBottom: '8px' }}>✓ 직접 방문이 어려운 이웃 대상</div>
                <div style={{ marginBottom: '8px' }}>✓ 차량을 통한 정기 배송</div>
                <div>✓ 복지센터 연계 서비스</div>
              </div>
            </div>
          </div>

          {/* 푸드마켓 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            border: '2px solid #DBEAFE',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}>
            {/* Icon/Image Section */}
            <div style={{
              backgroundColor: '#DBEAFE',
              padding: '40px',
              textAlign: 'center',
              borderBottom: '2px solid #3B82F6'
            }}>
              <div style={{ fontSize: '72px', marginBottom: '16px' }}>🏪</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1E40AF',
                margin: 0
              }}>
                푸드마켓
              </h3>
            </div>

            {/* Content Section */}
            <div style={{ padding: '32px' }}>
              <p style={{
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                평의적 형태의 마켓으로 이용자가 직접 방문하여 필요한 <strong style={{ color: '#3B82F6' }}>4-6가지의 식자재 및 생필품</strong>을
                선택하고 제공받을 수 있습니다.
              </p>
              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#374151'
              }}>
                <div style={{ marginBottom: '8px' }}>✓ 직접 방문하여 물품 선택</div>
                <div style={{ marginBottom: '8px' }}>✓ 자율적인 선택권 보장</div>
                <div>✓ 존엄성을 지키는 서비스</div>
              </div>
            </div>
          </div>

          {/* 기부처 발굴 및 수령 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            border: '2px solid #D1FAE5',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}>
            {/* Icon/Image Section */}
            <div style={{
              backgroundColor: '#D1FAE5',
              padding: '40px',
              textAlign: 'center',
              borderBottom: '2px solid #10B981'
            }}>
              <div style={{ fontSize: '72px', marginBottom: '16px' }}>🤝</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#065F46',
                margin: 0
              }}>
                기부처 발굴 및 수령
              </h3>
            </div>

            {/* Content Section */}
            <div style={{ padding: '32px' }}>
              <p style={{
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                이웃에게 필요한 기부처를 적극적으로 발굴하고 안전하게 물품을 수령하여
                <strong style={{ color: '#10B981' }}> 지속 가능한 나눔 생태계</strong>를 만들어갑니다.
              </p>
              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#374151'
              }}>
                <div style={{ marginBottom: '8px' }}>✓ 기업 및 개인 기부처 발굴</div>
                <div style={{ marginBottom: '8px' }}>✓ 안전한 물품 수령 및 관리</div>
                <div>✓ 효율적인 분배 시스템 운영</div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div style={{
          backgroundColor: 'white',
          padding: '48px 32px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '48px',
            textAlign: 'center'
          }}>
            사업 진행 프로세스
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            position: 'relative'
          }}>
            {/* Step 1 */}
            <div style={{
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#FEF3C7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '3px solid #F59E0B',
                fontSize: '36px'
              }}>
                📥
              </div>
              <div style={{
                backgroundColor: '#F59E0B',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>
                STEP 1
              </div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '8px'
              }}>
                물품 적정수령
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: '1.6'
              }}>
                기부처로부터 안전하고<br/>적정한 물품 수령
              </p>
            </div>

            {/* Arrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D97706',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              →
            </div>

            {/* Step 2 */}
            <div style={{
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#DBEAFE',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '3px solid #3B82F6',
                fontSize: '36px'
              }}>
                🔍
              </div>
              <div style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>
                STEP 2
              </div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '8px'
              }}>
                물품 검수
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: '1.6'
              }}>
                품질 확인 및<br/>상태 점검
              </p>
            </div>

            {/* Arrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D97706',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              →
            </div>

            {/* Step 3 */}
            <div style={{
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#D1FAE5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '3px solid #10B981',
                fontSize: '36px'
              }}>
                📋
              </div>
              <div style={{
                backgroundColor: '#10B981',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>
                STEP 3
              </div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '8px'
              }}>
                제공계획 수립
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: '1.6'
              }}>
                효율적인 분배를 위한<br/>계획 수립
              </p>
            </div>

            {/* Arrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D97706',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              →
            </div>

            {/* Step 4 */}
            <div style={{
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#FCE7F3',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '3px solid #EC4899',
                fontSize: '36px'
              }}>
                ❤️
              </div>
              <div style={{
                backgroundColor: '#EC4899',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>
                STEP 4
              </div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '8px'
              }}>
                이웃자 제공
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: '1.6'
              }}>
                이웃에게 따뜻하게<br/>전달
              </p>
            </div>
          </div>
        </div>

        {/* Impact Statement */}
        <div style={{
          marginTop: '60px',
          backgroundColor: '#FEF3C7',
          padding: '40px',
          borderRadius: '16px',
          border: '2px solid #F59E0B',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💝</div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#92400E',
            marginBottom: '16px'
          }}>
            함께 만드는 따뜻한 변화
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#78350F',
            lineHeight: '1.8',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            광명푸드뱅크마켓센터는 단순히 물품을 전달하는 것을 넘어,
            이웃의 존엄성을 지키고 자립을 돕는 나눔을 실천합니다.
            여러분의 따뜻한 관심과 참여가 더 나은 지역사회를 만듭니다.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;

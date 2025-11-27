import Layout from '../components/Layout';

const HowToUsePage = () => {
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
            이용안내
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.95
          }}>
            광명푸드뱅크마켓센터 신청 및 이용 방법
          </p>
        </div>
      </section>

      {/* Application Process */}
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
          신청 절차
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          4단계로 간편하게 신청하세요
        </p>

        {/* Process Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {/* Step 1: 신청 */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #FEF3C7',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#F59E0B',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              1
            </div>
            <div style={{ fontSize: '56px', marginBottom: '16px', marginTop: '12px' }}>📝</div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#D97706',
              marginBottom: '16px'
            }}>
              신청
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#4B5563',
              lineHeight: '1.7'
            }}>
              거주지역 관할 행정복지센터로 방문하여 신청 및 접수
            </p>
          </div>

          {/* Step 2: 검토 */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #DBEAFE',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#3B82F6',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              2
            </div>
            <div style={{ fontSize: '56px', marginBottom: '16px', marginTop: '12px' }}>🔍</div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#3B82F6',
              marginBottom: '16px'
            }}>
              검토
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#4B5563',
              lineHeight: '1.7'
            }}>
              행정복지센터 담당자 확인 및 검토
            </p>
          </div>

          {/* Step 3: 선정 */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #D1FAE5',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#10B981',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              3
            </div>
            <div style={{ fontSize: '56px', marginBottom: '16px', marginTop: '12px' }}>✅</div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#10B981',
              marginBottom: '16px'
            }}>
              선정
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#4B5563',
              lineHeight: '1.7'
            }}>
              매월 25일까지 광명푸드뱅크마켓센터로 보내온 공문 명단에 의하여 검토 후 익월부터 이용 가능하도록 안내
            </p>
          </div>

          {/* Step 4: 지원 */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #FCE7F3',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#EC4899',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              4
            </div>
            <div style={{ fontSize: '56px', marginBottom: '16px', marginTop: '12px' }}>🎁</div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#EC4899',
              marginBottom: '16px'
            }}>
              지원
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#4B5563',
              lineHeight: '1.7'
            }}>
              이웃자 등록 후 서비스 지원 (무상지원)
            </p>
          </div>
        </div>

        {/* Usage Period */}
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
            이용 기간
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              backgroundColor: '#FEF3C7',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #F59E0B'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📅</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#92400E',
                marginBottom: '12px'
              }}>
                기본 이용 기간
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#78350F',
                lineHeight: '1.7'
              }}>
                1년 단위 이용 가능 및 연장 1회 가능
              </p>
            </div>

            <div style={{
              backgroundColor: '#DBEAFE',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #3B82F6'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>⏸️</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1E40AF',
                marginBottom: '12px'
              }}>
                중단 기간
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#1E3A8A',
                lineHeight: '1.7'
              }}>
                1년 ~ 2년 사용 후 1년 이용 중단 필수
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            이용자 선정 기준
          </h3>
          <p style={{
            fontSize: '15px',
            color: '#6B7280',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            다음 기준에 따라 이용자를 선정합니다
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* 1순위 */}
            <div style={{
              backgroundColor: '#FEF3C7',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #F59E0B',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: '#F59E0B',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                1순위
              </div>
              <div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#92400E',
                  marginBottom: '8px'
                }}>
                  긴급지원 대상자
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#78350F',
                  margin: 0
                }}>
                  위기상황으로 긴급한 지원이 필요한 가구
                </p>
              </div>
            </div>

            {/* 2순위 */}
            <div style={{
              backgroundColor: '#DBEAFE',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #3B82F6',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                2순위
              </div>
              <div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1E40AF',
                  marginBottom: '8px'
                }}>
                  차상위 계층
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#1E3A8A',
                  margin: 0
                }}>
                  기준 중위소득 50% 이하의 저소득 가구
                </p>
              </div>
            </div>

            {/* 3순위 */}
            <div style={{
              backgroundColor: '#D1FAE5',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #10B981',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: '#10B981',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                3순위
              </div>
              <div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#065F46',
                  marginBottom: '8px'
                }}>
                  기초생활수급자 탈락자, 저소득가정
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#064E3B',
                  margin: 0
                }}>
                  수급 자격에서 탈락했거나 경제적 어려움을 겪는 가구
                </p>
              </div>
            </div>

            {/* 그 외 */}
            <div style={{
              backgroundColor: '#F3F4F6',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #9CA3AF',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: '#6B7280',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                flexShrink: 0,
                textAlign: 'center',
                lineHeight: '1.2'
              }}>
                그 외
              </div>
              <div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  기초생활수급자, 사회복지기관 및 시설 등
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#4B5563',
                  margin: 0
                }}>
                  기타 지원이 필요하다고 판단되는 개인 및 기관
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div style={{
          marginTop: '60px',
          backgroundColor: '#FEF3C7',
          padding: '40px',
          borderRadius: '16px',
          border: '2px solid #F59E0B',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📞</div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#92400E',
            marginBottom: '16px'
          }}>
            궁금한 사항이 있으신가요?
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#78350F',
            lineHeight: '1.8',
            marginBottom: '24px'
          }}>
            신청 방법이나 선정 기준에 대해 궁금하신 점이 있으시면<br/>
            거주지역 관할 행정복지센터 또는 광명푸드뱅크마켓센터로 문의해주세요.
          </p>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: 'white',
            padding: '24px 40px',
            borderRadius: '12px',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '15px', color: '#1F2937' }}>
              <strong>전화:</strong> 02-2688-1377
            </div>
            <div style={{ fontSize: '15px', color: '#1F2937' }}>
              <strong>이메일:</strong> gmfm1331@naver.com
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowToUsePage;

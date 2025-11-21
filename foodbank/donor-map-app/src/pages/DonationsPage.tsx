import Layout from '../components/Layout';

const DonationsPage = () => {
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
            기부참여
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.95
          }}>
            여러분의 나눔이 이웃에게 희망이 됩니다
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>❤️</div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            광명푸드뱅크마켓센터는
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#4B5563',
            lineHeight: '1.8',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            이웃자에게 안전하게 제공할 수 있는 모든 식품과 생활용품을 기부받습니다.<br/>
            식품 및 생활용품 외에도 현금후원도 가능합니다.
          </p>
        </div>

        {/* Tax Benefits Section */}
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          세제 혜택 안내
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          기부하시는 모든 분들께 세제 혜택이 제공됩니다
        </p>

        {/* Donation Flow Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {/* 물품 기부 - 제조업 */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #FEF3C7'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#D97706',
                marginBottom: '8px'
              }}>
                물품 기부 (제조업)
              </h3>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: '#FEF3C7',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#92400E',
                  marginBottom: '4px'
                }}>
                  기부식품등 영수증
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#D97706'
                }}>
                  100% 공제
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                fontSize: '24px',
                color: '#D97706',
                fontWeight: 'bold'
              }}>
                ↓
              </div>

              <div style={{
                backgroundColor: '#D97706',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  4,400만원
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>
                  소득공제 한도
                </div>
              </div>

              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#6B7280',
                textAlign: 'center'
              }}>
                제조업체의 경우 100% 손금처리 가능
              </div>
            </div>
          </div>

          {/* 물품 기부 - 비제조업 */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #DBEAFE'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎁</div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#3B82F6',
                marginBottom: '8px'
              }}>
                물품 기부 (비제조업)
              </h3>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: '#DBEAFE',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#1E40AF',
                  marginBottom: '4px'
                }}>
                  법정 기부금 영수증
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#3B82F6'
                }}>
                  50% 한도
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                fontSize: '24px',
                color: '#3B82F6',
                fontWeight: 'bold'
              }}>
                ↓
              </div>

              <div style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  4,400만원
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>
                  소득공제 한도
                </div>
              </div>

              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#6B7280',
                textAlign: 'center'
              }}>
                소득금액의 50% 한도 내 공제
              </div>
            </div>
          </div>

          {/* 현금 기부 - 직접 */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '3px solid #D1FAE5'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>💰</div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#10B981',
                marginBottom: '8px'
              }}>
                현금 기부 (직접)
              </h3>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: '#D1FAE5',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>💳</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#065F46',
                  marginBottom: '4px'
                }}>
                  직접기부금 영수증
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#10B981'
                }}>
                  10% 한도
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                fontSize: '24px',
                color: '#10B981',
                fontWeight: 'bold'
              }}>
                ↓
              </div>

              <div style={{
                backgroundColor: '#10B981',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  2,200만원
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>
                  소득공제 한도
                </div>
              </div>

              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#6B7280',
                textAlign: 'center'
              }}>
                소득금액의 10% 한도 내 공제
              </div>
            </div>
          </div>
        </div>

        {/* Alternative for Cash Donation */}
        <div style={{
          backgroundColor: '#FEF3C7',
          padding: '32px',
          borderRadius: '16px',
          border: '2px solid #F59E0B',
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#92400E',
            marginBottom: '16px'
          }}>
            💡 현금 기부의 다른 방법
          </h3>
          <p style={{
            fontSize: '15px',
            color: '#78350F',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            직접 기부가 부담되시는 경우, 광명시사회복지협의회를 통한 기부도 가능합니다.
          </p>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#1F2937'
          }}>
            현금 기부 → 사회복지협의회 → 광명푸드뱅크마켓센터
          </div>
        </div>

        {/* Corporate Benefits */}
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          기업체 기대효과
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          기업의 사회적 책임을 실천하고 다양한 혜택을 받으세요
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid #FEF3C7'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>💵</div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#D97706',
              marginBottom: '12px'
            }}>
              폐기에 따른 비용절감
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: '1.6'
            }}>
              폐기 처리 비용을 줄이고<br/>세제 혜택까지
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid #DBEAFE'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🏢</div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#3B82F6',
              marginBottom: '12px'
            }}>
              기업 이미지 강화
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: '1.6'
            }}>
              사회공헌 활동을 통한<br/>긍정적 기업 이미지 구축
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid #D1FAE5'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📢</div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#10B981',
              marginBottom: '12px'
            }}>
              기업마케팅 연계
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: '1.6'
            }}>
              나눔 활동을 마케팅에<br/>효과적으로 활용
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid #FCE7F3'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>⭐</div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#EC4899',
              marginBottom: '12px'
            }}>
              특성화된 사회공헌
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: '1.6'
            }}>
              기업의 특성에 맞는<br/>차별화된 사회공헌 활동
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div style={{
          backgroundColor: '#1F2937',
          color: 'white',
          padding: '48px',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '56px', marginBottom: '24px' }}>📞</div>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '24px'
          }}>
            기부 문의
          </h3>
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            marginBottom: '32px',
            lineHeight: '1.8'
          }}>
            기부에 관심이 있으시거나 궁금한 사항이 있으시면<br/>
            언제든지 연락 주세요. 친절하게 안내해 드리겠습니다.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '24px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📞</div>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>전화</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>02-2688-1377</div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '24px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📠</div>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>팩스</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>02-2688-0453</div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '24px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>이메일</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>gmfm1331@naver.com</div>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '72px', marginBottom: '24px' }}>🙏</div>
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#D97706',
            marginBottom: '16px'
          }}>
            여러분의 나눔에 감사드립니다
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            lineHeight: '1.8'
          }}>
            작은 나눔이 모여 큰 변화를 만듭니다.<br/>
            광명푸드뱅크마켓센터와 함께 더 따뜻한 지역사회를 만들어가요.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default DonationsPage;

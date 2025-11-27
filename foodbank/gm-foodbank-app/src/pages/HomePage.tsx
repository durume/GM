import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import {
  colors, spacing, typography, borderRadius, shadows,
  gradients, layout, components
} from '../theme';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section - Full Width, Impact-Driven */}
      <section style={{
        background: gradients.primary,
        color: colors.textInverse,
        padding: `${spacing[32]} ${spacing[6]}`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        <div style={{
          maxWidth: layout.maxWidth.xl,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{
            fontSize: typography.fontSize['7xl'],
            fontWeight: typography.fontWeight.extrabold,
            margin: `0 0 ${spacing[6]} 0`,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            lineHeight: typography.lineHeight.tight,
            letterSpacing: typography.letterSpacing.tight,
          }}>
            나눔으로 만드는<br />따뜻한 세상
          </h1>

          <p style={{
            fontSize: typography.fontSize['2xl'],
            margin: `0 0 ${spacing[10]} 0`,
            opacity: 0.95,
            lineHeight: typography.lineHeight.relaxed,
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            광명푸드뱅크마켓센터는 1998년부터<br />
            기부받은 식품과 생활용품을 어려운 이웃에게 전달하는<br />
            물적 나눔 제도를 운영하고 있습니다
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: spacing[4],
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link
              to="/donations"
              style={{
                ...components.button,
                ...components.button.large,
                backgroundColor: colors.backgroundAlt,
                color: colors.primary[900],
                boxShadow: shadows.xl,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing[2],
                fontWeight: typography.fontWeight.bold,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = shadows['2xl'];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows.xl;
              }}
            >
              <span style={{ fontSize: '24px' }}>❤️</span>
              <span>기부하기</span>
            </Link>

            <Link
              to="/how-to-use"
              style={{
                ...components.button,
                ...components.button.large,
                backgroundColor: 'transparent',
                color: colors.textInverse,
                border: `2px solid ${colors.textInverse}`,
                boxShadow: 'none',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing[2],
                fontWeight: typography.fontWeight.bold,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.textInverse;
                e.currentTarget.style.color = colors.primary[900];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.textInverse;
              }}
            >
              <span style={{ fontSize: '24px' }}>📋</span>
              <span>이용신청</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Dashboard - Data-Driven Impact */}
      <section style={{
        maxWidth: layout.maxWidth.xl,
        margin: '0 auto',
        padding: `${spacing[20]} ${spacing[6]}`,
        transform: 'translateY(-80px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: spacing[6],
        }}>
          {/* Stat Card 1 */}
          <div style={{
            ...components.statCard,
            background: colors.backgroundAlt,
            borderColor: colors.primary[200],
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = colors.primary[500];
            e.currentTarget.style.boxShadow = shadows['2xl'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = colors.primary[200];
            e.currentTarget.style.boxShadow = shadows.lg;
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: spacing[4],
            }}>📅</div>
            <div style={{
              fontSize: typography.fontSize['6xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.primary[900],
              fontFamily: typography.fontFamily.mono,
              lineHeight: typography.lineHeight.tight,
            }}>
              <AnimatedCounter end={26} suffix="+" />
            </div>
            <p style={{
              fontSize: typography.fontSize.lg,
              color: colors.textSecondary,
              margin: `${spacing[2]} 0 0 0`,
              fontWeight: typography.fontWeight.medium,
            }}>
              운영 역사 (년)
            </p>
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.textTertiary,
              margin: `${spacing[2]} 0 0 0`,
            }}>
              1998년부터 현재까지
            </p>
          </div>

          {/* Stat Card 2 */}
          <div style={{
            ...components.statCard,
            background: colors.backgroundAlt,
            borderColor: colors.secondary[200],
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = colors.secondary[600];
            e.currentTarget.style.boxShadow = shadows['2xl'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = colors.secondary[200];
            e.currentTarget.style.boxShadow = shadows.lg;
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: spacing[4],
            }}>🏢</div>
            <div style={{
              fontSize: typography.fontSize['6xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.secondary[800],
              fontFamily: typography.fontFamily.mono,
              lineHeight: typography.lineHeight.tight,
            }}>
              <AnimatedCounter end={4500} suffix="+" />
            </div>
            <p style={{
              fontSize: typography.fontSize.lg,
              color: colors.textSecondary,
              margin: `${spacing[2]} 0 0 0`,
              fontWeight: typography.fontWeight.medium,
            }}>
              전국 기초푸드뱅크
            </p>
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.textTertiary,
              margin: `${spacing[2]} 0 0 0`,
            }}>
              전국 네트워크 지점
            </p>
          </div>

          {/* Stat Card 3 */}
          <div style={{
            ...components.statCard,
            background: colors.backgroundAlt,
            borderColor: colors.data.blue.replace('#', '') + '33',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = colors.data.blue;
            e.currentTarget.style.boxShadow = shadows['2xl'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = colors.data.blue.replace('#', '') + '33';
            e.currentTarget.style.boxShadow = shadows.lg;
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: spacing[4],
            }}>🌐</div>
            <div style={{
              fontSize: typography.fontSize['6xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.data.blue,
              fontFamily: typography.fontFamily.mono,
              lineHeight: typography.lineHeight.tight,
            }}>
              <AnimatedCounter end={17} />
            </div>
            <p style={{
              fontSize: typography.fontSize.lg,
              color: colors.textSecondary,
              margin: `${spacing[2]} 0 0 0`,
              fontWeight: typography.fontWeight.medium,
            }}>
              광역푸드뱅크
            </p>
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.textTertiary,
              margin: `${spacing[2]} 0 0 0`,
            }}>
              전국 17개 시도
            </p>
          </div>

          {/* Stat Card 4 */}
          <div style={{
            ...components.statCard,
            background: colors.backgroundAlt,
            borderColor: colors.data.green.replace('#', '') + '33',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = colors.data.green;
            e.currentTarget.style.boxShadow = shadows['2xl'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = colors.data.green.replace('#', '') + '33';
            e.currentTarget.style.boxShadow = shadows.lg;
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: spacing[4],
            }}>🏆</div>
            <div style={{
              fontSize: typography.fontSize['6xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.data.green,
              fontFamily: typography.fontFamily.mono,
              lineHeight: typography.lineHeight.tight,
            }}>
              1위
            </div>
            <p style={{
              fontSize: typography.fontSize.lg,
              color: colors.textSecondary,
              margin: `${spacing[2]} 0 0 0`,
              fontWeight: typography.fontWeight.medium,
            }}>
              2023년 경기도
            </p>
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.textTertiary,
              margin: `${spacing[2]} 0 0 0`,
            }}>
              올해의 푸드뱅크·마켓
            </p>
          </div>
        </div>
      </section>

      {/* What is Food Bank - Modern Cards */}
      <section style={{
        maxWidth: layout.maxWidth.xl,
        margin: '0 auto',
        padding: `${spacing[20]} ${spacing[6]}`,
      }}>
        <div style={{ textAlign: 'center', marginBottom: spacing[16] }}>
          <h2 style={{
            fontSize: typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.extrabold,
            color: colors.neutral[900],
            marginBottom: spacing[4],
            letterSpacing: typography.letterSpacing.tight,
          }}>
            푸드뱅크란?
          </h2>
          <p style={{
            fontSize: typography.fontSize.lg,
            color: colors.textSecondary,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: typography.lineHeight.relaxed,
          }}>
            기부받은 식품과 생활용품을 어려운 이웃에게 전달하는 물적 나눔 제도입니다
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: spacing[8],
        }}>
          {/* Card 1: Food Sharing */}
          <div style={{
            ...components.card,
            textAlign: 'center',
            borderTop: `4px solid ${colors.primary[700]}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = shadows.xl;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = shadows.md;
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto',
              marginBottom: spacing[4],
              background: gradients.warm,
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              boxShadow: shadows.lg,
            }}>
              🍲
            </div>
            <h3 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.primary[900],
              marginBottom: spacing[4],
            }}>
              식품 나눔
            </h3>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.textSecondary,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              기부받은 식품을 어려운 이웃에게 전달하는 물적 나눔 제도로,
              건강하고 안전한 식품을 제공합니다
            </p>
          </div>

          {/* Card 2: Food Market */}
          <div style={{
            ...components.card,
            textAlign: 'center',
            borderTop: `4px solid ${colors.secondary[700]}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = shadows.xl;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = shadows.md;
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto',
              marginBottom: spacing[4],
              background: gradients.ocean,
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              boxShadow: shadows.lg,
            }}>
              🏪
            </div>
            <h3 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.secondary[800],
              marginBottom: spacing[4],
            }}>
              푸드마켓
            </h3>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.textSecondary,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              평의적 형태의 마켓으로 이용자가 직접 방문하여
              필요한 식자재와 생필품을 선택하고 제공받습니다
            </p>
          </div>

          {/* Card 3: Donation Collection */}
          <div style={{
            ...components.card,
            textAlign: 'center',
            borderTop: `4px solid ${colors.data.green}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = shadows.xl;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = shadows.md;
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto',
              marginBottom: spacing[4],
              background: `linear-gradient(135deg, ${colors.data.green} 0%, #2E7D32 100%)`,
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              boxShadow: shadows.lg,
            }}>
              🤝
            </div>
            <h3 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.data.green,
              marginBottom: spacing[4],
            }}>
              기부처 발굴
            </h3>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.textSecondary,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              이웃에게 필요한 기부처를 적극 발굴하고 안전하게 물품을 수령하여
              지속 가능한 나눔 생태계를 만듭니다
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Recognition Section */}
      <section style={{
        background: gradients.primary,
        color: colors.textInverse,
        padding: `${spacing[20]} ${spacing[6]}`,
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: layout.maxWidth.xl,
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.extrabold,
            marginBottom: spacing[12],
            letterSpacing: typography.letterSpacing.tight,
          }}>
            신뢰받는 기관
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacing[10],
          }}>
            <div style={{
              padding: spacing[6],
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: borderRadius.xl,
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: '56px', marginBottom: spacing[3] }}>🏆</div>
              <div style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing[2],
              }}>
                2023년 1위
              </div>
              <p style={{ fontSize: typography.fontSize.sm, opacity: 0.9 }}>
                경기도 올해의<br />푸드뱅크·마켓
              </p>
            </div>

            <div style={{
              padding: spacing[6],
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: borderRadius.xl,
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: '56px', marginBottom: spacing[3] }}>✓</div>
              <div style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing[2],
              }}>
                공정무역 인증
              </div>
              <p style={{ fontSize: typography.fontSize.sm, opacity: 0.9 }}>
                전국 최초<br />실천기관 인증
              </p>
            </div>

            <div style={{
              padding: spacing[6],
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: borderRadius.xl,
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: '56px', marginBottom: spacing[3] }}>🏛️</div>
              <div style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing[2],
              }}>
                대한적십자사
              </div>
              <p style={{ fontSize: typography.fontSize.sm, opacity: 0.9 }}>
                봉사회광명지구<br />협의회 위탁운영
              </p>
            </div>

            <div style={{
              padding: spacing[6],
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: borderRadius.xl,
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: '56px', marginBottom: spacing[3] }}>📜</div>
              <div style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing[2],
              }}>
                26년 역사
              </div>
              <p style={{ fontSize: typography.fontSize.sm, opacity: 0.9 }}>
                1998년부터<br />지속된 신뢰
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links - Modern CTAs */}
      <section style={{
        maxWidth: layout.maxWidth.xl,
        margin: '0 auto',
        padding: `${spacing[20]} ${spacing[6]}`,
      }}>
        <div style={{ textAlign: 'center', marginBottom: spacing[16] }}>
          <h2 style={{
            fontSize: typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.extrabold,
            color: colors.neutral[900],
            marginBottom: spacing[4],
            letterSpacing: typography.letterSpacing.tight,
          }}>
            빠른 안내
          </h2>
          <p style={{
            fontSize: typography.fontSize.lg,
            color: colors.textSecondary,
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            필요한 정보를 빠르게 찾아보세요
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: spacing[6],
        }}>
          {[
            { to: '/services', icon: '📦', title: '주요사업', desc: '푸드뱅크, 푸드마켓 운영', color: colors.primary[600], bg: colors.primary[50] },
            { to: '/how-to-use', icon: '📋', title: '이용안내', desc: '신청방법 및 선정기준', color: colors.data.blue, bg: '#E3F2FD' },
            { to: '/donations', icon: '❤️', title: '기부참여', desc: '세제혜택 및 참여방법', color: colors.data.green, bg: '#E8F5E9' },
            { to: '/contact', icon: '📍', title: '오시는길', desc: '위치 및 연락처 안내', color: colors.accent.coral, bg: '#FCE4EC' },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              style={{
                ...components.card,
                textDecoration: 'none',
                backgroundColor: item.bg,
                borderLeft: `4px solid ${item.color}`,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = shadows.xl;
                e.currentTarget.style.borderLeftWidth = '8px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows.md;
                e.currentTarget.style.borderLeftWidth = '4px';
              }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: spacing[3],
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                color: item.color,
                marginBottom: spacing[2],
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: typography.fontSize.base,
                color: colors.textSecondary,
                margin: 0,
                lineHeight: typography.lineHeight.relaxed,
              }}>
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        backgroundColor: colors.neutral[900],
        color: colors.textInverse,
        padding: `${spacing[24]} ${spacing[6]}`,
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.extrabold,
            marginBottom: spacing[6],
            letterSpacing: typography.letterSpacing.tight,
          }}>
            함께 변화를 만들어요
          </h2>
          <p style={{
            fontSize: typography.fontSize.lg,
            marginBottom: spacing[10],
            lineHeight: typography.lineHeight.relaxed,
            opacity: 0.9,
          }}>
            작은 나눔이 모여 큰 변화를 만듭니다.<br />
            광명푸드뱅크마켓센터와 함께 더 따뜻한 지역사회를 만들어가요.
          </p>

          <div style={{
            display: 'flex',
            gap: spacing[4],
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link
              to="/donations"
              style={{
                ...components.button,
                ...components.button.large,
                ...components.button.primary,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing[2],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = shadows['2xl'];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows.md;
              }}
            >
              <span style={{ fontSize: '24px' }}>❤️</span>
              <span>지금 기부하기</span>
            </Link>

            <Link
              to="/contact"
              style={{
                ...components.button,
                ...components.button.large,
                backgroundColor: 'transparent',
                color: colors.textInverse,
                border: `2px solid ${colors.textInverse}`,
                boxShadow: 'none',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing[2],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.textInverse;
                e.currentTarget.style.color = colors.neutral[900];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.textInverse;
              }}
            >
              <span style={{ fontSize: '24px' }}>📞</span>
              <span>문의하기</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: ${typography.fontSize['4xl']} !important;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: ${typography.fontSize['3xl']} !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;

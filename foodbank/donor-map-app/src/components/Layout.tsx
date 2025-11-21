import { Link, useLocation } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import ScrollToTop from './ScrollToTop';
import {
  colors, shadows, transitions, typography, zIndex, spacing,
  borderRadius, gradients, layout
} from '../theme';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '홈', icon: '🏠' },
    { path: '/about', label: '센터소개', icon: '📖' },
    { path: '/services', label: '주요사업', icon: '📦' },
    { path: '/how-to-use', label: '이용안내', icon: '📋' },
    { path: '/donations', label: '기부참여', icon: '❤️' },
    { path: '/contact', label: '오시는길', icon: '📍' },
    { path: '/maps', label: '후원자지도', icon: '🗺️' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/maps') {
      return location.pathname.startsWith('/maps');
    }
    return location.pathname === path;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-100px',
          left: spacing[6],
          backgroundColor: colors.primary[900],
          color: colors.textInverse,
          padding: `${spacing[3]} ${spacing[6]}`,
          textDecoration: 'none',
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.bold,
          zIndex: zIndex.max,
          transition: transitions.fast,
          borderRadius: borderRadius.md,
          boxShadow: shadows.xl,
        }}
        onFocus={(e) => {
          e.currentTarget.style.top = spacing[6];
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = '-100px';
        }}
      >
        메인 콘텐츠로 건너뛰기
      </a>

      {/* Header/Navigation - Modern & Professional */}
      <header
        role="banner"
        style={{
          backgroundColor: colors.backgroundAlt,
          boxShadow: shadows.md,
          position: 'sticky',
          top: 0,
          zIndex: zIndex.sticky,
          borderBottom: `1px solid ${colors.neutral[200]}`,
        }}
      >
        <div style={{
          maxWidth: layout.maxWidth.xl,
          margin: '0 auto',
          padding: `0 ${spacing[6]}`
        }}>
          {/* Top Bar - Logo and Brand */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[5]} 0`,
          }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3]
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: gradients.primary,
                borderRadius: borderRadius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: shadows.md,
              }}>
                🏦
              </div>
              <div>
                <h1 style={{
                  margin: 0,
                  fontSize: typography.fontSize['3xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.neutral[900],
                  lineHeight: typography.lineHeight.tight,
                }}>
                  광명푸드뱅크마켓센터
                </h1>
                <p style={{
                  margin: 0,
                  fontSize: typography.fontSize.sm,
                  color: colors.textSecondary,
                  fontWeight: typography.fontWeight.medium,
                }}>
                  나눔으로 만드는 따뜻한 세상
                </p>
              </div>
            </Link>

            {/* Contact Info - Desktop Only */}
            <div style={{
              display: 'flex',
              gap: spacing[6],
              alignItems: 'center',
            }}>
              <a
                href="tel:02-2688-1377"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  color: colors.textSecondary,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  transition: transitions.fast,
                  padding: `${spacing[2]} ${spacing[3]}`,
                  borderRadius: borderRadius.md,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary[900];
                  e.currentTarget.style.backgroundColor = colors.primary[50];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textSecondary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>📞</span>
                <span className="desktop-only">02-2688-1377</span>
              </a>
            </div>
          </div>

          {/* Navigation Bar - Modern Horizontal */}
          <nav
            role="navigation"
            aria-label="주요 메뉴"
            style={{
              display: 'flex',
              gap: spacing[1],
              paddingBottom: spacing[5],
              flexWrap: 'wrap',
              borderTop: `1px solid ${colors.neutral[200]}`,
              paddingTop: spacing[4],
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                style={{
                  padding: `${spacing[3]} ${spacing[5]}`,
                  textDecoration: 'none',
                  color: isActive(item.path) ? colors.primary[900] : colors.neutral[700],
                  fontWeight: isActive(item.path)
                    ? typography.fontWeight.bold
                    : typography.fontWeight.medium,
                  fontSize: typography.fontSize.base,
                  borderRadius: borderRadius.md,
                  transition: transitions.fast,
                  backgroundColor: isActive(item.path) ? colors.primary[50] : 'transparent',
                  border: isActive(item.path)
                    ? `2px solid ${colors.primary[900]}`
                    : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = colors.primary[900];
                    e.currentTarget.style.backgroundColor = colors.primary[50];
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = colors.neutral[700];
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        {children}
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer - Modern, Information-Rich */}
      <footer
        role="contentinfo"
        style={{
          backgroundColor: colors.neutral[900],
          color: colors.neutral[200],
          marginTop: 'auto'
        }}
      >
        {/* Main Footer Content */}
        <div style={{
          maxWidth: layout.maxWidth.xl,
          margin: '0 auto',
          padding: `${spacing[16]} ${spacing[6]}`,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: spacing[12],
          }}>
            {/* Organization Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3],
                marginBottom: spacing[4],
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: gradients.primary,
                  borderRadius: borderRadius.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  🏦
                </div>
                <h3 style={{
                  margin: 0,
                  color: colors.primary[400],
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                }}>
                  광명푸드뱅크마켓센터
                </h3>
              </div>
              <p style={{
                margin: `${spacing[3]} 0`,
                fontSize: typography.fontSize.base,
                lineHeight: typography.lineHeight.relaxed,
                color: colors.neutral[300],
              }}>
                대한적십자사봉사회광명지구협의회 위탁 운영
              </p>
              <p style={{
                margin: `${spacing[2]} 0`,
                fontSize: typography.fontSize.sm,
                color: colors.neutral[400],
                lineHeight: typography.lineHeight.relaxed,
              }}>
                나눔과 봉사로 따뜻한 세상을 만들어갑니다
              </p>

              {/* Trust Badges */}
              <div style={{
                display: 'flex',
                gap: spacing[3],
                marginTop: spacing[6],
              }}>
                <div style={{
                  padding: `${spacing[2]} ${spacing[3]}`,
                  backgroundColor: 'rgba(255, 167, 38, 0.1)',
                  borderRadius: borderRadius.md,
                  fontSize: typography.fontSize.xs,
                  color: colors.primary[400],
                  fontWeight: typography.fontWeight.semibold,
                  border: `1px solid ${colors.primary[800]}`,
                }}>
                  🏆 2023 경기도 1위
                </div>
                <div style={{
                  padding: `${spacing[2]} ${spacing[3]}`,
                  backgroundColor: 'rgba(0, 150, 136, 0.1)',
                  borderRadius: borderRadius.md,
                  fontSize: typography.fontSize.xs,
                  color: colors.secondary[200],
                  fontWeight: typography.fontWeight.semibold,
                  border: `1px solid ${colors.secondary[700]}`,
                }}>
                  ✓ 공정무역 인증
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 style={{
                margin: `0 0 ${spacing[4]} 0`,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[100],
              }}>
                연락처
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[3],
              }}>
                <a
                  href="tel:02-2688-1377"
                  style={{
                    color: colors.neutral[300],
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2],
                    fontSize: typography.fontSize.base,
                    transition: transitions.fast,
                    padding: `${spacing[2]} 0`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.primary[400];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.neutral[300];
                  }}
                >
                  <span>📞</span> 02-2688-1377
                </a>
                <div style={{
                  color: colors.neutral[300],
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  fontSize: typography.fontSize.base,
                }}>
                  <span>📠</span> 02-2688-0453
                </div>
                <a
                  href="mailto:gmfm1331@naver.com"
                  style={{
                    color: colors.neutral[300],
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2],
                    fontSize: typography.fontSize.base,
                    transition: transitions.fast,
                    padding: `${spacing[2]} 0`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.primary[400];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.neutral[300];
                  }}
                >
                  <span>📧</span> gmfm1331@naver.com
                </a>
              </div>
            </div>

            {/* Address & Hours */}
            <div>
              <h4 style={{
                margin: `0 0 ${spacing[4]} 0`,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[100],
              }}>
                주소 및 운영시간
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[3],
              }}>
                <div style={{
                  color: colors.neutral[300],
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[2] }}>
                    <span>📍</span>
                    <div>
                      <div>경기도 광명시 오리로 362</div>
                      <div style={{ color: colors.neutral[400], fontSize: typography.fontSize.sm }}>
                        (소하동 1389-3)
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  color: colors.neutral[300],
                  fontSize: typography.fontSize.sm,
                  lineHeight: typography.lineHeight.relaxed,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[2] }}>
                    <span>🕐</span>
                    <div>
                      <div>평일 09:00 - 18:00</div>
                      <div style={{ color: colors.neutral[400] }}>
                        (점심시간 12:00-13:00)
                      </div>
                      <div style={{ color: colors.neutral[400] }}>
                        토요일, 일요일, 공휴일 휴무
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{
                margin: `0 0 ${spacing[4]} 0`,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[100],
              }}>
                바로가기
              </h4>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[2],
              }}>
                {navItems.slice(0, 5).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      color: colors.neutral[300],
                      textDecoration: 'none',
                      fontSize: typography.fontSize.base,
                      transition: transitions.fast,
                      padding: `${spacing[2]} 0`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[2],
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary[400];
                      e.currentTarget.style.paddingLeft = spacing[2];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.neutral[300];
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    <span>{item.icon}</span> {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div style={{
          borderTop: `1px solid ${colors.neutral[800]}`,
          backgroundColor: colors.neutral[900],
        }}>
          <div style={{
            maxWidth: layout.maxWidth.xl,
            margin: '0 auto',
            padding: `${spacing[6]} ${spacing[6]}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: spacing[3],
            textAlign: 'center',
          }}>
            <p style={{
              margin: 0,
              fontSize: typography.fontSize.sm,
              color: colors.neutral[400],
            }}>
              © 2024 광명푸드뱅크마켓센터. All rights reserved.
            </p>
            <p style={{
              margin: 0,
              fontSize: typography.fontSize.xs,
              color: colors.neutral[500],
            }}>
              Professional Website • React • TypeScript • Powered by Claude Code
            </p>
            <div style={{
              display: 'flex',
              gap: spacing[4],
              fontSize: typography.fontSize.xs,
              color: colors.neutral[500],
            }}>
              <span>26년 운영 역사</span>
              <span>•</span>
              <span>4,500+ 전국 네트워크</span>
              <span>•</span>
              <span>WCAG AA 준수</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive Styles */}
      <style>{`
        /* Desktop contact info visibility */
        @media (max-width: 1023px) {
          .desktop-only {
            display: none !important;
          }
        }

        /* Tablet & Mobile Navigation */
        @media (max-width: 768px) {
          header h1 {
            font-size: ${typography.fontSize.xl} !important;
          }

          header p {
            font-size: ${typography.fontSize.xs} !important;
          }

          nav {
            flex-direction: column;
            gap: ${spacing[2]} !important;
          }

          nav a {
            width: 100%;
            justify-content: flex-start;
          }

          footer {
            text-align: left;
          }

          footer > div:first-child {
            grid-template-columns: 1fr !important;
            gap: ${spacing[10]} !important;
          }
        }

        @media (max-width: 480px) {
          header h1 {
            font-size: ${typography.fontSize.lg} !important;
          }

          header div[style*="48px"] {
            width: 36px !important;
            height: 36px !important;
            font-size: 18px !important;
          }
        }

        /* Focus Styles for Accessibility */
        a:focus-visible,
        button:focus-visible {
          outline: 3px solid ${colors.primary[500]} !important;
          outline-offset: 2px !important;
          border-radius: ${borderRadius.md};
        }

        /* Print Styles */
        @media print {
          header {
            position: static !important;
            box-shadow: none !important;
          }

          nav {
            display: none !important;
          }

          footer {
            page-break-before: always;
          }

          button[aria-label="맨 위로 이동"] {
            display: none !important;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;

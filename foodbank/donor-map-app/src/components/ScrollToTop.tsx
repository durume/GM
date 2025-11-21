import { useState, useEffect } from 'react';
import { colors, shadows, transitions, zIndex, borderRadius } from '../theme';

/**
 * ScrollToTop Component
 * Displays a button that appears when user scrolls down
 * Clicking the button smoothly scrolls back to the top of the page
 * Implements WCAG 2.1 AA accessibility standards
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="맨 위로 이동"
          title="맨 위로 이동"
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '56px',
            height: '56px',
            borderRadius: borderRadius.full,
            backgroundColor: colors.primary[600],
            color: colors.textInverse,
            border: 'none',
            boxShadow: shadows.xl,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            zIndex: zIndex.fixed,
            transition: transitions.default,
            opacity: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary[700];
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = shadows['2xl'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary[600];
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = shadows.xl;
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `3px solid ${colors.primary[300]}`;
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          ↑
        </button>
      )}

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          button[aria-label="맨 위로 이동"] {
            bottom: 24px !important;
            right: 24px !important;
            width: 48px !important;
            height: 48px !important;
            font-size: 20px !important;
          }
        }

        @media (max-width: 480px) {
          button[aria-label="맨 위로 이동"] {
            bottom: 16px !important;
            right: 16px !important;
            width: 44px !important;
            height: 44px !important;
            font-size: 18px !important;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;

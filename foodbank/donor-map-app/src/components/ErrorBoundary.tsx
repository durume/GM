import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '32px',
          backgroundColor: '#FEF2F2',
          borderRadius: '8px',
          margin: '16px',
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px',
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
            }}>⚠️</div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#DC2626',
              marginBottom: '16px',
            }}>
              오류가 발생했습니다
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#991B1B',
              marginBottom: '24px',
              lineHeight: '1.6',
            }}>
              지도를 불러오는 중 문제가 발생했습니다.
              <br />
              페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#DC2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B91C1C'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
            >
              페이지 새로고침
            </button>
            {this.state.error && (
              <details style={{
                marginTop: '24px',
                textAlign: 'left',
                fontSize: '14px',
                color: '#991B1B',
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
                  기술 정보 보기
                </summary>
                <pre style={{
                  backgroundColor: '#FEE2E2',
                  padding: '12px',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '12px',
                }}>
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

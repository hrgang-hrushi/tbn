import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = 'Something went wrong.';
      try {
        const parsedError = JSON.parse(this.state.error.message);
        if (parsedError.error) {
          errorMessage = `Firestore Error: ${parsedError.error} during ${parsedError.operationType} on ${parsedError.path}`;
        }
      } catch (_) {
        errorMessage = this.state.error.message || errorMessage;
      }

      return (
        <div style={{ 
          padding: '80px 40px', 
          textAlign: 'center', 
          background: 'rgba(15, 17, 22, 0.6)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 24, 
          border: '1px solid rgba(239, 68, 68, 0.2)',
          margin: '40px auto',
          maxWidth: 600,
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
        }}>
          <h2 style={{ color: '#ef4444', fontSize: 32, fontWeight: 600 }}>Oops! An error occurred.</h2>
          <p style={{ color: 'var(--muted)', marginTop: '16px', fontSize: 16 }}>{errorMessage}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="cta"
            style={{ marginTop: '32px', padding: '14px 32px', borderRadius: 100, border: 'none', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

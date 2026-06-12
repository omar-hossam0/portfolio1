import React from 'react';

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error } as State;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled error caught by ErrorBoundary', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: '#000',
          color: '#fff'
        }}>
          <div style={{maxWidth: 980}}>
            <h1 style={{color: '#ff6b6b', marginBottom: 8}}>Unexpected error</h1>
            <p style={{color: '#fff', opacity: 0.9, marginBottom: 12}}>The app encountered an error while rendering. Check the browser console for details.</p>
            <pre style={{whiteSpace: 'pre-wrap', color: '#ffecec', background: '#1b1b1b', padding: 12, borderRadius: 6}}>
              {this.state.error?.message}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

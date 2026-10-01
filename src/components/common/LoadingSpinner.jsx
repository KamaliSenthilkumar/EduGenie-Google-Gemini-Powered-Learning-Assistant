import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ text = 'Generating with Google Gemini AI...', size = 32 }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        gap: '16px'
      }}
    >
      <div
        style={{
          width: `${size + 24}px`,
          height: `${size + 24}px`,
          borderRadius: '50%',
          backgroundColor: '#EEF2FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4F46E5'
        }}
      >
        <Loader2 size={size} className="animate-spin" />
      </div>
      {text && (
        <p style={{ fontSize: '0.95rem', fontWeight: 500, color: '#64748B', textAlign: 'center' }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

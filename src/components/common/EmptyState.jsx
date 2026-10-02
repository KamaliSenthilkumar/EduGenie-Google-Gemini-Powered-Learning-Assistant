import React from 'react';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title = 'No Data Found',
  description = 'There are no records to display at this moment.',
  actionLabel,
  onAction,
  actionIcon
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '56px 24px',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        border: '1.5px dashed #CBD5E1'
      }}
    >
      {Icon && (
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: '#EEF2FF',
            color: '#4F46E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <Icon size={32} />
        </div>
      )}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1E293B', marginBottom: '6px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: '400px', marginBottom: actionLabel ? '20px' : 0 }}>
        {description}
      </p>
      {actionLabel && (
        <Button variant="primary" onClick={onAction} icon={actionIcon}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

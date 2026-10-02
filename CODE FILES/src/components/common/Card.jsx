import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  action,
  headerBorder = false,
  className = '',
  style = {},
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`edugenie-card ${className}`}
      style={{
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px -2px rgba(11, 15, 59, 0.05)',
        ...style
      }}
      {...props}
    >
      {(title || subtitle || action) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            paddingBottom: headerBorder ? '14px' : '0',
            borderBottom: headerBorder ? '1px solid #F1F5F9' : 'none'
          }}
        >
          <div>
            {title && (
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1E293B', marginBottom: subtitle ? '4px' : 0 }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

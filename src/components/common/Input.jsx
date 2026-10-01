import React from 'react';

const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  rightElement,
  fullWidth = true,
  required = false,
  id,
  className = '',
  style = {},
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: fullWidth ? '100%' : 'auto', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#1E293B',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {label}
          {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div style={{ position: 'absolute', left: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <Icon size={18} />
          </div>
        )}

        <input
          id={inputId}
          style={{
            width: '100%',
            padding: '11px 14px',
            paddingLeft: Icon ? '40px' : '14px',
            paddingRight: rightElement ? '42px' : '14px',
            borderRadius: '12px',
            border: error ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            fontSize: '0.925rem',
            color: '#1E293B',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
          className={className}
          {...props}
        />

        {rightElement && (
          <div style={{ position: 'absolute', right: '12px', display: 'flex', alignItems: 'center' }}>
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 500 }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;

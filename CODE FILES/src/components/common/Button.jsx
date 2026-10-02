import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  style = {},
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '12px',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.65 : 1,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    width: fullWidth ? '100%' : 'auto',
    border: '1px solid transparent',
    ...style
  };

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.85rem' },
    md: { padding: '10px 18px', fontSize: '0.95rem' },
    lg: { padding: '13px 26px', fontSize: '1.05rem' }
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#4F46E5',
      color: '#FFFFFF',
      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
    },
    secondary: {
      backgroundColor: '#EEF2FF',
      color: '#4F46E5'
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: '#CBD5E1',
      color: '#334155'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#64748B'
    },
    danger: {
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)'
    }
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant]
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={combinedStyles}
      className={`edugenie-btn ${className}`}
      {...props}
    >
      {loading && <Loader2 size={size === 'sm' ? 14 : 18} className="animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 18} />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 18} />}
    </button>
  );
};

export default Button;

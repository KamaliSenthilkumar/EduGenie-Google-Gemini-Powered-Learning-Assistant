import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const StatCard = ({
  icon: Icon,
  value,
  label,
  sublabel,
  trend,
  trendPositive = true,
  iconBg = '#EEF2FF',
  iconColor = '#4F46E5',
  style = {}
}) => {
  return (
    <div
      className="edugenie-card"
      style={{
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '18px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        minHeight: '145px',
        ...style
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            backgroundColor: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor
          }}
        >
          {Icon && <Icon size={24} />}
        </div>
        {trend && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              padding: '4px 8px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: trendPositive ? '#DCFCE7' : '#FEE2E2',
              color: trendPositive ? '#15803D' : '#B91C1C'
            }}
          >
            {trendPositive && !trend.includes('🔥') && <ArrowUpRight size={13} />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '14px' }}>
        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', lineHeight: 1.1 }}>
          {value}
        </div>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748B', marginTop: '4px' }}>
          {label}
        </div>
        {sublabel && (
          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

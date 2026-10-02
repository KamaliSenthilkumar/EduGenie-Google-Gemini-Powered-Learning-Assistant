import React from 'react';

const TopicDistributionChart = ({ topics = [] }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {topics.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
              {item.name}
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>
              {item.count} items ({item.percentage}%)
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '9px',
              backgroundColor: '#F1F5F9',
              borderRadius: '6px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${item.percentage}%`,
                height: '100%',
                backgroundColor: item.color || '#4F46E5',
                borderRadius: '6px',
                transition: 'width 0.8s ease'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicDistributionChart;

import React, { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import { BarChart3 } from 'lucide-react';

const WeeklyProgressChart = ({ data = [], loading = false }) => {
  const [activeRange, setActiveRange] = useState('This Week');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (loading) {
    return <LoadingSpinner text="Loading progress metrics..." size={28} />;
  }

  if (!data || data.length === 0) {
    return <EmptyState icon={BarChart3} title="No progress data" description="Start a quiz or study session to view your progress graph." />;
  }

  // Dimensions
  const height = 220;
  const width = 640;
  const paddingX = 45;
  const paddingY = 30;

  const maxVal = 100;
  const minVal = 0;

  // Calculate coordinates
  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (data.length - 1);
    const y = height - paddingY - ((d.score - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);
    return { ...d, x, y };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // Catmull-Rom or cubic bezier curve
    const prev = points[i - 1];
    const cpX1 = prev.x + (p.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (p.x - prev.x) / 2;
    const cpY2 = p.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div style={{ width: '100%' }}>
      {/* Header controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Average performance:</span>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#4F46E5', marginLeft: '6px' }}>
            {Math.round(data.reduce((acc, curr) => acc + curr.score, 0) / data.length)}%
          </span>
        </div>

        <select
          value={activeRange}
          onChange={(e) => setActiveRange(e.target.value)}
          style={{
            width: 'auto',
            padding: '6px 12px',
            fontSize: '0.825rem',
            fontWeight: 500,
            borderRadius: '10px',
            borderColor: '#E2E8F0',
            backgroundColor: '#F8FAFC',
            color: '#1E293B',
            cursor: 'pointer'
          }}
        >
          <option value="This Week">This Week</option>
          <option value="Last Week">Last Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* SVG Container */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = height - paddingY - (val / 100) * (height - 2 * paddingY);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1.5"
                  strokeDasharray={val === 0 ? '0' : '4 4'}
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  fill="#94A3B8"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="Inter, sans-serif"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Line Stroke */}
          <path d={pathD} fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g
              key={idx}
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint?.day === p.day ? 7 : 4.5}
                fill="#FFFFFF"
                stroke="#4F46E5"
                strokeWidth={hoveredPoint?.day === p.day ? 3 : 2.5}
                style={{ transition: 'all 0.15s ease' }}
              />
              <text
                x={p.x}
                y={height - 8}
                fill={hoveredPoint?.day === p.day ? '#4F46E5' : '#64748B'}
                fontSize="11"
                fontWeight={hoveredPoint?.day === p.day ? '700' : '500'}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {p.day}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              backgroundColor: '#0B0F3B',
              color: '#FFFFFF',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              animation: 'fadeIn 0.15s ease'
            }}
          >
            <div style={{ fontWeight: 600, color: '#818CF8' }}>{hoveredPoint.day} Performance</div>
            <div>Score: <strong>{hoveredPoint.score}%</strong></div>
            <div>Time spent: {hoveredPoint.hours}h ({hoveredPoint.completed} tasks)</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyProgressChart;

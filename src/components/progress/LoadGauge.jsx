import React from 'react';

export default function LoadGauge({ ratio = 1.0, status = 'Optimal Load', color = '#4CAF50' }) {
  // Gauge goes from 0 to 2.0+ ratio
  const maxRatio = 2.0;
  const clampedRatio = Math.min(ratio, maxRatio);
  const angle = (clampedRatio / maxRatio) * 180 - 90; // -90 to 90 degrees

  const gaugeSegments = [
    { color: '#3B82F6', label: 'Under', from: 0, to: 0.8 },
    { color: '#4CAF50', label: 'Optimal', from: 0.8, to: 1.3 },
    { color: '#FF9800', label: 'Caution', from: 1.3, to: 1.5 },
    { color: '#FF6B35', label: 'Risk', from: 1.5, to: 2.0 },
  ];

  // SVG gauge dimensions
  const cx = 100, cy = 100, r = 75;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const ratioToAngle = (val) => (val / maxRatio) * 180;

  const arcPath = (startRatio, endRatio, outerR = r, innerR = r - 15) => {
    const startAngle = ratioToAngle(startRatio) - 180;
    const endAngle = ratioToAngle(endRatio) - 180;
    const s1 = { x: cx + outerR * Math.cos(toRad(startAngle)), y: cy + outerR * Math.sin(toRad(startAngle)) };
    const e1 = { x: cx + outerR * Math.cos(toRad(endAngle)), y: cy + outerR * Math.sin(toRad(endAngle)) };
    const s2 = { x: cx + innerR * Math.cos(toRad(endAngle)), y: cy + innerR * Math.sin(toRad(endAngle)) };
    const e2 = { x: cx + innerR * Math.cos(toRad(startAngle)), y: cy + innerR * Math.sin(toRad(startAngle)) };
    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${e2.x} ${e2.y} Z`;
  };

  const needleAngle = (clampedRatio / maxRatio) * 180 - 180;
  const needleLen = 60;
  const needleX = cx + needleLen * Math.cos(toRad(needleAngle));
  const needleY = cy + needleLen * Math.sin(toRad(needleAngle));

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 115" className="w-full max-w-[240px]">
        {/* Gauge segments */}
        {gaugeSegments.map(seg => (
          <path
            key={seg.label}
            d={arcPath(seg.from, seg.to)}
            fill={seg.color}
            opacity={0.85}
          />
        ))}

        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={needleX} y2={needleY}
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="white" />

        {/* Center text */}
        <text x={cx} y={cy - 18} textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Inter">
          {ratio.toFixed(2)}
        </text>
      </svg>

      {/* Labels */}
      <div className="flex justify-between w-full max-w-[240px] -mt-2 px-2">
        {gaugeSegments.map(seg => (
          <span key={seg.label} className="text-[9px] font-medium" style={{ color: seg.color }}>
            {seg.label}
          </span>
        ))}
      </div>

      <div className="mt-3 text-center">
        <span className="text-base font-bold" style={{ color }}>{status}</span>
      </div>
    </div>
  );
}

import React from 'react';

const Logo = ({ size = 'md', variant = 'dark', showText = true, className = '', style = {} }) => {
  const heightMap = {
    sm: '38px',
    md: '50px',
    lg: '72px'
  };

  const titleSizeMap = {
    sm: '1.05rem',
    md: '1.25rem',
    lg: '1.7rem'
  };

  const subSizeMap = {
    sm: '0.62rem',
    md: '0.72rem',
    lg: '0.85rem'
  };

  const height = heightMap[size] || heightMap.md;

  return (
    <div
      className={`select-none cursor-pointer ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', ...style }}
    >
      <img
        src="/logo.png"
        alt="SRV - The Winning Edge Logo"
        style={{
          height: height,
          width: 'auto',
          borderRadius: '50%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 12px rgba(118, 163, 118, 0.35))',
          flexShrink: 0
        }}
      />

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.15 }}>
          <span style={{
            fontFamily: "'Barlow Condensed', 'Teko', 'Rajdhani', sans-serif",
            fontWeight: 900,
            fontSize: titleSizeMap[size] || titleSizeMap.md,
            color: variant === 'light' ? '#FFFFFF' : '#0F4C2C',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}>
            SRV THE WINNING EDGE
          </span>
          <span style={{
            fontFamily: "'Barlow Condensed', 'Rajdhani', 'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: subSizeMap[size] || subSizeMap.md,
            color: variant === 'light' ? '#F7D358' : '#5E7A5E',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            marginTop: '2px'
          }}>
            SPORTS & EVENT MANAGEMENT
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

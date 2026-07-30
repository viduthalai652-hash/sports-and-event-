import React from 'react';

const Logo = ({ size = 'md', variant = 'dark', showText = true, className = '', style = {} }) => {
  const heightMap = {
    sm: '34px',
    md: '48px',
    lg: '68px'
  };

  const height = heightMap[size] || heightMap.md;

  return (
    <div
      className={`select-none cursor-pointer ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', ...style }}
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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.15, minWidth: 0 }}>
          <span
            className="logo-title-text"
            style={{
              fontFamily: "'Barlow Condensed', 'Teko', 'Rajdhani', sans-serif",
              fontWeight: 900,
              fontSize: size === 'sm' ? '0.98rem' : size === 'lg' ? '1.6rem' : 'clamp(0.95rem, 3.2vw, 1.25rem)',
              color: variant === 'light' ? '#FFFFFF' : '#0F4C2C',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            SRV THE WINNING EDGE
          </span>
          <span
            className="logo-sub-text"
            style={{
              fontFamily: "'Barlow Condensed', 'Rajdhani', 'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: size === 'sm' ? '0.58rem' : size === 'lg' ? '0.8rem' : 'clamp(0.55rem, 1.8vw, 0.72rem)',
              color: variant === 'light' ? '#F7D358' : '#5E7A5E',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              marginTop: '1px'
            }}
          >
            SPORTS & EVENT MANAGEMENT
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

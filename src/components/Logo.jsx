import React from 'react';

const Logo = ({ size = 'md', className = '', style = {} }) => {
  const heightMap = {
    sm: '48px',
    md: '65px',
    lg: '96px'
  };

  const height = heightMap[size] || heightMap.md;

  return (
    <div
      className={`select-none cursor-pointer ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', ...style }}
    >
      <img
        src="/logo.png"
        alt="SRV - The Winning Edge Logo"
        style={{
          height: height,
          width: 'auto',
          borderRadius: '50%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 12px rgba(118, 163, 118, 0.35))'
        }}
      />
    </div>
  );
};

export default Logo;

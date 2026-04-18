import React from 'react';

const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`glass p-6 rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;

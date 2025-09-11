import React from 'react';

const FSSLogo = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="greenGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#065f46" />
          </radialGradient>
          <radialGradient id="tealGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#134e4a" />
          </radialGradient>
          <radialGradient id="redGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
          <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a3a3a3" />
            <stop offset="50%" stopColor="#d4d4d8" />
            <stop offset="100%" stopColor="#71717a" />
          </linearGradient>
        </defs>

        {/* Left Circle - F */}
        <circle
          cx="35"
          cy="75"
          r="30"
          fill="url(#greenGradient)"
          opacity="0.9"
        />

        {/* Top Circle - S */}
        <circle
          cx="60"
          cy="45"
          r="30"
          fill="url(#tealGradient)"
          opacity="0.9"
        />

        {/* Right Circle - S */}
        <circle
          cx="85"
          cy="75"
          r="30"
          fill="url(#redGradient)"
          opacity="0.9"
        />

        {/* Letter F */}
        <text
          x="35"
          y="85"
          fontSize="32"
          fontWeight="bold"
          textAnchor="middle"
          fill="url(#letterGradient)"
          fontFamily="Arial, sans-serif"
        >
          F
        </text>

        {/* Letter S (top) */}
        <text
          x="60"
          y="55"
          fontSize="32"
          fontWeight="bold"
          textAnchor="middle"
          fill="url(#letterGradient)"
          fontFamily="Arial, sans-serif"
        >
          S
        </text>

        {/* Letter S (right) */}
        <text
          x="85"
          y="85"
          fontSize="32"
          fontWeight="bold"
          textAnchor="middle"
          fill="url(#letterGradient)"
          fontFamily="Arial, sans-serif"
        >
          S
        </text>
      </svg>
    </div>
  );
};

export default FSSLogo;
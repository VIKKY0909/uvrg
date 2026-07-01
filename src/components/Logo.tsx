import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'white';
}

export default function Logo({ className = '', size = 'md', variant = 'color' }: LogoProps) {
  // Dimensions based on size
  const dimensions = {
    sm: { width: '100%', height: 'auto', maxWidth: '150px' },
    md: { width: '100%', height: 'auto', maxWidth: '240px' },
    lg: { width: '100%', height: 'auto', maxWidth: '360px' },
    xl: { width: '100%', height: 'auto', maxWidth: '480px' },
  }[size];

  // Colors based on variant
  const colors = {
    uvrBlue: variant === 'white' ? '#FFFFFF' : '#3E76D5',
    greenText: variant === 'white' ? '#FFFFFF' : '#01B050',
    energiesBlue: variant === 'white' ? '#FFFFFF' : '#1F69B6',
    subText: variant === 'white' ? '#E2E8F0' : '#1E5095',
    sunStart: '#FF7A00',
    sunEnd: '#FFB800',
    roofBlue: '#1561AC',
    waveBlue: '#13589D',
    waveOrange: '#F28500',
    panelGrid: variant === 'white' ? '#3B82F6' : '#2A72BA',
    panelFill: '#FFFFFF',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 320"
      className={className}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        maxWidth: dimensions.maxWidth,
        display: 'inline-block',
      }}
      aria-label="UVR Green Energies Logo"
    >
      <defs>
        {/* Sun Gradient */}
        <linearGradient id="sunGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={colors.sunStart} />
          <stop offset="100%" stopColor={colors.sunEnd} />
        </linearGradient>
        
        {/* Wave Gradients */}
        <linearGradient id="blueWave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E5FA1" />
          <stop offset="100%" stopColor="#124A81" />
        </linearGradient>
        <linearGradient id="orangeWave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E05B00" />
          <stop offset="100%" stopColor="#FFA600" />
        </linearGradient>
      </defs>

      {/* --- LEFT SIDE: UVR TEXT --- */}
      {/* Dynamic UVR Path, rounded, thick and geometric */}
      <g transform="translate(40, 50)">
        {/* U */}
        <path
          d="M 50 20 L 50 110 C 50 145, 90 145, 90 145 L 175 145 C 175 145, 215 145, 215 110 L 215 20 L 175 20 L 175 105 C 175 115, 165 115, 165 115 L 100 115 C 90 115, 90 105, 90 105 L 90 20 Z"
          fill={colors.uvrBlue}
        />
        {/* V */}
        <path
          d="M 235 20 L 290 145 L 335 145 L 390 20 L 350 20 L 312 110 L 275 20 Z"
          fill={colors.uvrBlue}
        />
        {/* R */}
        <path
          d="M 410 20 L 410 145 L 450 145 L 450 95 L 490 145 L 538 145 L 492 90 C 522 84, 532 65, 532 52 C 532 20, 480 20, 460 20 Z M 450 48 L 472 48 C 485 48, 492 53, 492 62 C 492 71, 485 75, 472 75 L 450 75 Z"
          fill={colors.uvrBlue}
        />
      </g>

      {/* --- RIGHT SIDE: SUN & ROOF GRAPHIC --- */}
      <g transform="translate(560, 10)">
        {/* Rising Sun */}
        <path
          d="M 120 180 C 120 100, 185 35, 265 35 C 345 35, 410 100, 410 180 Z"
          fill="url(#sunGrad)"
        />

        {/* Sun Rays (Triangles pointing outward) */}
        {/* Center: (265, 180). Radius: 155 */}
        <g stroke={colors.sunStart} strokeWidth="1" fill="url(#sunGrad)">
          {/* Ray 1 (Leftmost, ~190deg) */}
          <polygon points="105,170 120,165 120,175" />
          {/* Ray 2 (~210deg) */}
          <polygon points="120,125 140,130 135,140" />
          {/* Ray 3 (~230deg) */}
          <polygon points="155,85 178,98 170,105" />
          {/* Ray 4 (~250deg) */}
          <polygon points="205,55 225,75 215,82" />
          {/* Ray 5 (~270deg, Straight Up) */}
          <polygon points="265,20 280,45 250,45" />
          {/* Ray 6 (~290deg) */}
          <polygon points="325,55 315,82 305,75" />
          {/* Ray 7 (~310deg) */}
          <polygon points="375,85 360,105 352,98" />
          {/* Ray 8 (~330deg) */}
          <polygon points="410,125 395,140 390,130" />
          {/* Ray 9 (Rightmost, ~350deg) */}
          <polygon points="425,170 410,175 410,165" />
        </g>

        {/* --- HOUSE 1 (LEFT, SMALLER) --- */}
        {/* Roof background fill */}
        <polygon points="60,178 140,110 220,178" fill="#FFFFFF" />
        {/* Blue Roof Outline */}
        <polygon points="60,178 140,110 220,178 215,180 140,116 65,180" fill={colors.roofBlue} />
        {/* Solar Panel grid on Left Roof slope */}
        <g transform="translate(140, 110)">
          {/* Panel trapezoid base */}
          <polygon points="0,0 72,55 60,57 -8,4" fill={colors.panelGrid} opacity="0.9" />
          {/* White grid lines inside panel */}
          <line x1="18" y1="14" x2="1" y2="18" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="36" y1="28" x2="19" y2="32" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="54" y1="41" x2="37" y2="46" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Longitudinal lines */}
          <line x1="28" y1="5" x2="48" y2="56" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="-3" y1="2" x2="12" y2="52" stroke="#FFFFFF" strokeWidth="2.5" />
        </g>
        {/* Window for House 1 */}
        <rect x="131" y="145" width="18" height="18" fill={colors.roofBlue} />
        {/* Cross on window */}
        <line x1="140" y1="145" x2="140" y2="163" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="131" y1="154" x2="149" y2="154" stroke="#FFFFFF" strokeWidth="2.5" />


        {/* --- HOUSE 2 (RIGHT, LARGER, FOREGROUND) --- */}
        {/* Roof background fill */}
        <polygon points="160,178 270,80 380,178" fill="#FFFFFF" />
        {/* Blue Roof Outline */}
        <polygon points="160,178 270,80 380,178 372,180 270,88 168,180" fill={colors.roofBlue} />
        {/* Solar Panel grid on Right Roof slope */}
        <g transform="translate(270, 80)">
          <polygon points="0,0 100,75 88,78 -8,5" fill={colors.panelGrid} opacity="0.9" />
          {/* White grid lines inside panel */}
          <line x1="22" y1="17" x2="1" y2="22" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="45" y1="34" x2="23" y2="40" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="68" y1="51" x2="45" y2="57" stroke="#FFFFFF" strokeWidth="3" />
          {/* Longitudinal lines */}
          <line x1="38" y1="8" x2="62" y2="76" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="-3" y1="2" x2="18" y2="70" stroke="#FFFFFF" strokeWidth="3" />
        </g>
        {/* Window for House 2 */}
        <rect x="259" y="130" width="22" height="22" fill={colors.roofBlue} />
        <line x1="270" y1="130" x2="270" y2="152" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="259" y1="141" x2="281" y2="141" stroke="#FFFFFF" strokeWidth="2.5" />


        {/* Flowing Waves at Bottom (S-curves) */}
        {/* Blue Wave */}
        <path
          d="M 10,185 C 120,185 180,210 270,195 C 340,183 390,165 460,188 C 455,193 420,208 350,212 C 260,217 190,193 10,190 Z"
          fill="url(#blueWave)"
        />
        {/* Orange Wave */}
        <path
          d="M -10,180 C 80,180 160,202 240,192 C 320,182 380,168 440,184 C 410,188 340,197 270,198 C 170,199 110,184 -10,182 Z"
          fill="url(#orangeWave)"
        />
      </g>

      {/* --- BOTTOM ROW 1: GREEN ENERGIES TEXT --- */}
      <g transform="translate(40, 240)">
        {/* "GREEN" in vibrant green with letter spacing */}
        <text
          x="10"
          y="0"
          fontSize="54"
          fontWeight="bold"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          letterSpacing="48"
          fill={colors.greenText}
        >
          GREEN
        </text>

        {/* "ENERGIES" in rich blue with letter spacing */}
        <text
          x="440"
          y="0"
          fontSize="54"
          fontWeight="bold"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          letterSpacing="30"
          fill={colors.energiesBlue}
        >
          ENERGIES
        </text>
      </g>

      {/* --- BOTTOM ROW 2: SUBTITLE --- */}
      <text
        x="450"
        y="295"
        fontSize="24"
        fontWeight="600"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        letterSpacing="2.5"
        fill={colors.subText}
      >
        Powered by UVR TECHSOL Pvt. Ltd.
      </text>

      {/* Trademark "TM" */}
      <text
        x="910"
        y="105"
        fontSize="16"
        fontWeight="bold"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fill={variant === 'white' ? '#FFFFFF' : '#888888'}
      >
        TM
      </text>
    </svg>
  );
}

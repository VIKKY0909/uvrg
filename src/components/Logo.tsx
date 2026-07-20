import React from 'react';
import uvrLogo from '../assets/brand/uvr-logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 'color'  — logo on a subtle light chip (legible on dark or light backgrounds).
   * 'plain'  — bare logo image with no backing (use only on white/very-light surfaces).
   * 'white'  — kept for API compatibility; renders the same as 'color'.
   */
  variant?: 'color' | 'white' | 'plain';
}

// Real brand asset: logo/Logo CDR.PDF export (UVR GREEN ENERGIES — Powered by UVR TECHSOL Pvt. Ltd.,
// "MNRE Approved Solar EPC Partner"). The wordmark's tagline is dark, so on the site's dark theme the
// image sits on a light chip to stay legible. Update the asset by replacing src/assets/brand/uvr-logo.png.
export default function Logo({ className = '', size = 'md', variant = 'color' }: LogoProps) {
  const maxWidth = { sm: '150px', md: '240px', lg: '360px', xl: '480px' }[size];
  const plain = variant === 'plain';

  return (
    <span
      className={`inline-flex items-center justify-center ${
        plain ? '' : 'bg-white rounded-lg px-2.5 py-1.5 shadow-sm ring-1 ring-black/5'
      } ${className}`}
      style={{ maxWidth }}
    >
      <img
        src={uvrLogo}
        alt="UVR Green Energies — Powered by UVR TECHSOL Pvt. Ltd."
        width={1296}
        height={474}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}

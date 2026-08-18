import React from 'react';

// Common default stroke color: #C59B27 (Champagne Gold)
export const CrownPremiumIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 18h16" />
    <path d="M5 18l-1.5-10 4.5 3.5 4-7.5 4 7.5 4.5-3.5-1.5 10H5z" />
    <circle cx="12" cy="5" r="1" fill={color} />
    <circle cx="3.5" cy="8" r="1" fill={color} />
    <circle cx="20.5" cy="8" r="1" fill={color} />
  </svg>
);

export const FlowerSparkleIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
    <path d="M12 14a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
    <path d="M2 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
    <path d="M14 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

export const TruckExpressIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="1" y="5" width="14" height="11" rx="2" />
    <path d="M15 9h4.5l2.5 3v4h-7V9z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="17.5" cy="18.5" r="2.5" />
    <path d="M8 18.5h7" />
  </svg>
);

export const WhatsAppGoldIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9.5 8.5c.3 0 .7.1 1 .5l.8 1.4c.1.2.1.5 0 .7l-.4.5c-.1.2-.2.4 0 .7.4.7 1 1.3 1.7 1.7.3.2.5.1.7 0l.5-.4c.2-.1.5-.1.7 0l1.4.8c.4.3.5.7.5 1s-.2.8-.5 1c-.4.3-1.1.5-1.9.3-1.3-.3-2.6-1.1-3.7-2.2-1.1-1.1-1.9-2.4-2.2-3.7-.2-.8 0-1.5.3-1.9.2-.3.6-.5 1-.5z" />
  </svg>
);

export const ShieldQualityIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L7 11.5l3.5-.5L12 8z" fill={color} opacity="0.3" />
  </svg>
);

export const HeartMinimalIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const ArrowRightGoldIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

export const SearchMinimalIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const FilterMinimalIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const CloseMinimalIcon = ({ size = 24, color = "currentColor", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const InstagramGoldIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const MapPinGoldIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const PhoneGoldIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const SparkleStarIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
  </svg>
);

export const FacebookGoldIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const ShareMinimalIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.3, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const CheckMinimalIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.8, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * High-elegance SVG Botanical Vines and Blooming Roses for Backgrounds
 * Ultra lightweight (0 KB external payload, pure inline vector graphics)
 */
export const FloralCornerVine = ({ position = 'top-left', className = '', ...props }) => {
  const isLeft = position.includes('left');
  const isTop = position.includes('top');

  const transformStyle = {
    transform: `${!isLeft ? 'scaleX(-1)' : ''} ${!isTop ? 'scaleY(-1)' : ''}`,
    transformOrigin: 'center'
  };

  return (
    <div 
      className={`floral-vine-wrapper ${position} ${className}`}
      style={{
        position: 'absolute',
        [isTop ? 'top' : 'bottom']: '-10px',
        [isLeft ? 'left' : 'right']: '-10px',
        width: '240px',
        height: '240px',
        pointerEvents: 'none',
        zIndex: 1,
        ...transformStyle
      }}
      aria-hidden="true"
      {...props}
    >
      <svg 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', opacity: 0.35 }}
      >
        {/* Main curved botanical stems */}
        <path 
          d="M10 10 C 60 40, 90 90, 110 170" 
          stroke="#C59B27" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <path 
          d="M10 10 C 40 60, 90 90, 170 110" 
          stroke="#C59B27" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
        />

        {/* Blooming Rose Blossom */}
        <g transform="translate(65, 65)">
          <circle cx="0" cy="0" r="16" stroke="#C59B27" strokeWidth="1.6" fill="rgba(197, 155, 39, 0.08)" />
          <path d="M-8 -6 C-4 -14, 4 -14, 8 -6 C14 -4, 14 4, 8 8 C4 14, -4 14, -8 8 C-14 4, -14 -4, -8 -6 Z" stroke="#C59B27" strokeWidth="1.4" fill="rgba(232, 180, 184, 0.22)" />
          <path d="M-5 -3 C-2 -7, 2 -7, 5 -3 C8 -2, 8 2, 5 5 C2 8, -2 8, -5 5 C-8 2, -8 -2, -5 -3 Z" stroke="#C59B27" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="3" fill="#C59B27" />
        </g>

        {/* Secondary Rose Bud */}
        <g transform="translate(135, 105)">
          <circle cx="0" cy="0" r="11" stroke="#C59B27" strokeWidth="1.4" fill="rgba(197, 155, 39, 0.08)" />
          <path d="M-5 -4 C-2 -9, 3 -9, 6 -4 C10 -2, 10 3, 6 6 C3 10, -2 10, -5 6 C-9 3, -9 -2, -5 -4 Z" stroke="#C59B27" strokeWidth="1.1" fill="rgba(232, 180, 184, 0.18)" />
        </g>

        {/* Third Flower Bud */}
        <g transform="translate(105, 145)">
          <circle cx="0" cy="0" r="10" stroke="#C59B27" strokeWidth="1.3" fill="rgba(197, 155, 39, 0.08)" />
          <path d="M-4 -3 C-1 -7, 2 -7, 5 -3 C8 -1, 8 3, 5 5 C2 8, -1 8, -4 5 C-7 3, -7 -1, -4 -3 Z" stroke="#C59B27" strokeWidth="1" fill="rgba(232, 180, 184, 0.18)" />
        </g>

        {/* Delicate Leaves */}
        <path d="M35 30 C 25 15, 45 10, 50 25 C 45 35, 38 35, 35 30 Z" stroke="#96761A" strokeWidth="1.3" fill="rgba(197, 155, 39, 0.1)" />
        <path d="M30 45 C 15 40, 12 60, 26 62 C 34 56, 33 48, 30 45 Z" stroke="#96761A" strokeWidth="1.3" fill="rgba(197, 155, 39, 0.1)" />
        <path d="M90 55 C 105 45, 115 60, 102 70 C 92 68, 88 60, 90 55 Z" stroke="#96761A" strokeWidth="1.3" fill="rgba(197, 155, 39, 0.1)" />
        <path d="M75 110 C 60 120, 55 100, 70 95 C 78 100, 78 107, 75 110 Z" stroke="#96761A" strokeWidth="1.3" fill="rgba(197, 155, 39, 0.1)" />
        <path d="M140 85 C 155 75, 165 90, 152 98 C 144 95, 140 89, 140 85 Z" stroke="#96761A" strokeWidth="1.3" fill="rgba(197, 155, 39, 0.1)" />

        {/* Golden Sparkles */}
        <path d="M25 85 L27 90 L32 92 L27 94 L25 99 L23 94 L18 92 L23 90 Z" fill="#C59B27" opacity="0.75" />
        <path d="M85 25 L87 30 L92 32 L87 34 L85 39 L83 34 L78 32 L83 30 Z" fill="#C59B27" opacity="0.75" />
        <path d="M145 50 L146 53 L149 54 L146 55 L145 58 L144 55 L141 54 L144 53 Z" fill="#C59B27" opacity="0.65" />
      </svg>
    </div>
  );
};

/**
 * Floating Rose Petals scattered across sections
 */
export const FloatingPetalsLayer = () => {
  return (
    <div className="floating-petals-container" aria-hidden="true">
      <svg className="petal-floating p-1" viewBox="0 0 30 30" fill="none">
        <path d="M15 2 C8 8, 4 18, 15 28 C26 18, 22 8, 15 2 Z" fill="rgba(232, 180, 184, 0.45)" stroke="#C59B27" strokeWidth="0.8" />
        <path d="M15 4 L15 26" stroke="#C59B27" strokeWidth="0.5" strokeDasharray="1 2" />
      </svg>

      <svg className="petal-floating p-2" viewBox="0 0 30 30" fill="none">
        <path d="M15 2 C8 8, 4 18, 15 28 C26 18, 22 8, 15 2 Z" fill="rgba(197, 155, 39, 0.35)" stroke="#C59B27" strokeWidth="0.8" />
      </svg>

      <svg className="petal-floating p-3" viewBox="0 0 30 30" fill="none">
        <path d="M15 2 C8 8, 4 18, 15 28 C26 18, 22 8, 15 2 Z" fill="rgba(232, 180, 184, 0.4)" stroke="#C59B27" strokeWidth="0.8" />
      </svg>

      <svg className="petal-floating p-4" viewBox="0 0 30 30" fill="none">
        <path d="M15 2 C8 8, 4 18, 15 28 C26 18, 22 8, 15 2 Z" fill="rgba(197, 155, 39, 0.32)" stroke="#C59B27" strokeWidth="0.8" />
      </svg>

      <svg className="petal-floating p-5" viewBox="0 0 30 30" fill="none">
        <path d="M15 2 C8 8, 4 18, 15 28 C26 18, 22 8, 15 2 Z" fill="rgba(232, 180, 184, 0.42)" stroke="#C59B27" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

/**
 * Elegant Golden Botanical Divider with delicate rose emblem
 */
export const FloralDivider = ({ className = '' }) => (
  <div className={`floral-divider-row ${className}`} aria-hidden="true">
    <div className="divider-line" />
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none" className="divider-flower">
      <circle cx="15" cy="15" r="10" stroke="#C59B27" strokeWidth="1.2" fill="rgba(197, 155, 39, 0.08)" />
      <path d="M15 5 C10 10, 10 20, 15 25 C20 20, 20 10, 15 5 Z" stroke="#C59B27" strokeWidth="1" fill="rgba(232, 180, 184, 0.35)" />
      <path d="M5 15 C10 10, 20 10, 25 15 C20 20, 10 20, 5 15 Z" stroke="#C59B27" strokeWidth="1" fill="rgba(232, 180, 184, 0.35)" />
      <circle cx="15" cy="15" r="2.5" fill="#C59B27" />
    </svg>
    <div className="divider-line" />
  </div>
);

/**
 * Official Book of Claims INDECOPI Icon
 */
export const BookClaimsGoldIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.4, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h6" />
    <circle cx="15.5" cy="15.5" r="2" fill={color} />
  </svg>
);

/**
 * PDF Download Document Icon
 */
export const DownloadPdfIcon = ({ size = 24, color = "#C59B27", strokeWidth = 1.4, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <polyline points="9 15 12 18 15 15" />
  </svg>
);


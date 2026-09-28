import React from "react";

interface ArmorLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function ArmorLogo({ className = "h-8 w-auto", width = 320, height = 80 }: ArmorLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 80"
      width={width}
      height={height}
      fill="none"
      className={className}
      role="img"
      aria-label="Armor Fit Official Logo"
    >
      {/* Armor Shield Icon */}
      <g transform="translate(10, 10)">
        {/* Outer Shield Crest */}
        <path
          d="M30 4 L54 14 V36 C54 50 42 62 30 68 C18 62 6 50 6 36 V14 L30 4 Z"
          fill="#121417"
          stroke="#E4E4E7"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Inner Armor Facets */}
        <path
          d="M30 10 L48 18 V35 C48 46 38 56 30 61 V10 Z"
          fill="#D4A373"
          fillOpacity="0.18"
          stroke="#D4A373"
          strokeWidth="1.5"
        />
        <path
          d="M30 10 L12 18 V35 C12 46 22 56 30 61 V10 Z"
          fill="#FFFFFF"
          fillOpacity="0.05"
          stroke="#71717A"
          strokeWidth="1.5"
        />
        {/* Central Barbarian / Spartan Helmet / Chevron V-Cut */}
        <path d="M30 20 L40 26 V38 L30 46 L20 38 V26 L30 20 Z" fill="#E4E4E7" />
        <path d="M28 26 H32 V40 H28 Z" fill="#0B0C0E" />
        <line x1="30" y1="46" x2="30" y2="56" stroke="#D4A373" strokeWidth="2" />
      </g>
      {/* Brand Typography */}
      <text
        x="82"
        y="38"
        fill="#F4F4F5"
        fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="900"
        fontSize="24"
        letterSpacing="3.5"
      >
        ARMOR<tspan fill="#D4A373" fontWeight="400">FIT</tspan>
      </text>
      <text
        x="83"
        y="56"
        fill="#A1A1AA"
        fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="600"
        fontSize="8.5"
        letterSpacing="3.2"
      >
        STRENGTH &amp; CONDITIONING
      </text>
      {/* Subtle Geographic Tag */}
      <rect x="83" y="62" width="4" height="4" fill="#D4A373" />
      <text
        x="93"
        y="66"
        fill="#71717A"
        fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="500"
        fontSize="7.5"
        letterSpacing="1.5"
      >
        GORAKHPUR
      </text>
    </svg>
  );
}

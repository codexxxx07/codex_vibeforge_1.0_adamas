import { useId } from "react";

/**
 * Shipwise brand mark — a compass needle on a rounded teal tile.
 * Drawn once, reused in the navbar, footer and pages.
 */
export default function LogoMark({ size = 34, className = "" }) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="6" y1="6" x2="27" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2BA89F" />
          <stop offset="1" stopColor="#12524F" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8.5" fill={`url(#${gradientId})`} />
      <path d="M16 5.5 21 16 16 26.5 11 16 16 5.5Z" fill="#fff" />
      <path d="M16 10.5 18.75 16 16 21.5 13.25 16 16 10.5Z" fill="#0B1120" opacity="0.28" />
      <circle cx="16" cy="16" r="1.5" fill="#fff" />
    </svg>
  );
}

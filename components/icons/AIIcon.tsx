
import React from 'react';

export const AIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect x="4" y="12" width="16" height="8" rx="2" />
    <path d="M12 12v0" />
    <path d="M16 16v0" />
    <path d="M8 16v0" />
    <path d="M12 20v0" />
    <path d="m14.2 6.2 3.6 3.6" />
    <path d="M12 4h4.5a2.5 2.5 0 0 1 0 5H12V4Z" />
  </svg>
);

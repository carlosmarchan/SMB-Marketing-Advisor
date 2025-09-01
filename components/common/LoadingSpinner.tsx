
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-24 h-24 border-8',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`animate-spin rounded-full border-stone-300 border-t-amber-600 ${sizeClasses[size]}`}
      ></div>
      {size !== 'sm' && <p className="text-stone-500">Brewing ideas...</p>}
    </div>
  );
};

export default LoadingSpinner;


import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-stone-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="text-white text-3xl mr-3" role="img" aria-label="coffee cup">☕</span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Coffee Shop Marketing Advisor
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

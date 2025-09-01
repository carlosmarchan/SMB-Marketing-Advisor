
import React, { useState } from 'react';
import type { MarketingCategory, MarketingStrategy } from '../types';

interface MarketingCategoryCardProps {
  category: MarketingCategory;
  onSelectStrategy: (strategy: MarketingStrategy) => void;
  selectedStrategyId?: string | null;
}

const MarketingCategoryCard: React.FC<MarketingCategoryCardProps> = ({ category, onSelectStrategy, selectedStrategyId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = category.icon;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-stone-200 transition-all duration-300 hover:shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <div className="flex items-center">
          <Icon className="w-10 h-10 text-amber-700 mr-4" />
          <div>
            <h3 className="text-lg font-bold text-stone-800">{category.name}</h3>
            <p className="text-sm text-stone-500">{category.description}</p>
          </div>
        </div>
        <svg
          className={`w-6 h-6 text-stone-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="bg-stone-50 p-5 border-t border-stone-200">
          <ul className="space-y-3">
            {category.strategies.map((strategy) => (
              <li key={strategy.id}>
                <button
                  onClick={() => onSelectStrategy(strategy)}
                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 text-sm ${
                    selectedStrategyId === strategy.id
                      ? 'bg-amber-600 text-white font-semibold shadow'
                      : 'bg-white hover:bg-amber-100 text-stone-700'
                  }`}
                >
                  {strategy.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MarketingCategoryCard;

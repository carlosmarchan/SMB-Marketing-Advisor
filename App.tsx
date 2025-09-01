
import React, { useState, useCallback } from 'react';
// Fix: Import types from './types' and constants from './constants'.
import { MARKETING_CATEGORIES } from './constants';
import type { MarketingCategory, MarketingStrategy } from './types';
import Header from './components/Header';
import MarketingCategoryCard from './components/MarketingCategoryCard';
import MarketingStrategyDetails from './components/MarketingStrategyDetails';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<MarketingStrategy | null>(null);

  const handleSelectStrategy = useCallback((strategy: MarketingStrategy) => {
    setSelectedStrategy(strategy);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedStrategy(null);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Your Marketing Menu</h2>
          <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">
            Explore a world of marketing options for your coffee shop. Select a category to reveal strategies, then click a strategy to learn more and get AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-6">
            {MARKETING_CATEGORIES.map((category: MarketingCategory) => (
              <MarketingCategoryCard
                key={category.id}
                category={category}
                onSelectStrategy={handleSelectStrategy}
                selectedStrategyId={selectedStrategy?.id}
              />
            ))}
          </div>
          
          <div className="lg:col-span-2">
            <MarketingStrategyDetails 
              strategy={selectedStrategy}
              onClear={handleClearSelection}
            />
          </div>
        </div>

        <hr className="my-16 border-t-2 border-dashed border-stone-300" />

        <AIAssistant />

      </main>
      <footer className="text-center py-8 text-stone-500">
        <p>&copy; {new Date().getFullYear()} Coffee Shop Marketing Advisor. Brewed with AI.</p>
      </footer>
    </div>
  );
};

export default App;

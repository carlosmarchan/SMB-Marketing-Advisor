
import React, { useState, useEffect, useCallback } from 'react';
import type { MarketingStrategy } from '../types';
import { getStrategyDetails } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';

interface MarketingStrategyDetailsProps {
  strategy: MarketingStrategy | null;
  onClear: () => void;
}

const MarketingStrategyDetails: React.FC<MarketingStrategyDetailsProps> = ({ strategy, onClear }) => {
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDetails = useCallback(async (strategyName: string) => {
    setIsLoading(true);
    setError('');
    setDetails('');
    try {
      const result = await getStrategyDetails(strategyName);
      setDetails(result);
    } catch (err) {
      setError('Failed to fetch details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (strategy) {
      fetchDetails(strategy.name);
    } else {
      setDetails('');
      setError('');
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategy]);

  if (!strategy) {
    return (
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-inner border border-stone-200 h-full flex flex-col justify-center items-center text-center">
        <img src="https://picsum.photos/id/225/300/200" alt="Coffee beans" className="rounded-lg mb-6 shadow-lg" />
        <h3 className="text-2xl font-bold text-stone-700">Explore Your Options</h3>
        <p className="text-stone-500 mt-2">Select a strategy from the menu on the left to see AI-powered details and first steps.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-stone-200 sticky top-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-amber-800">{strategy.name}</h3>
          <p className="text-stone-500">{strategy.description}</p>
        </div>
        <button
          onClick={onClear}
          className="text-stone-400 hover:text-stone-600 transition-colors"
          title="Clear selection"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div className="mt-6 min-h-[20rem]">
        {isLoading && <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>}
        {error && <div className="text-red-500 bg-red-100 p-4 rounded-md">{error}</div>}
        {details && !isLoading && (
          <div className="prose prose-stone max-w-none prose-headings:text-amber-900 prose-strong:text-stone-800 prose-bullets:marker:text-amber-600">
            <h4 className="flex items-center text-lg font-semibold mb-3">
              <SparklesIcon className="w-5 h-5 mr-2 text-amber-600" />
              AI-Generated Insights
            </h4>
            {/* Fix: Improved markdown rendering to generate valid HTML for lists. */}
            <div
              className="whitespace-pre-wrap text-stone-700"
              dangerouslySetInnerHTML={{
                __html: details
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(
                    /(?:^- .*(?:\r\n|\n|\r|$))+/gm,
                    (match) =>
                      `<ul>${match
                        .trim()
                        .split(/\r\n|\n|\r/)
                        .filter((line) => line.trim())
                        .map((line) => `<li>${line.substring(2).trim()}</li>`)
                        .join('')}</ul>`
                  ),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingStrategyDetails;

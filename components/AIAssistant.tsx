
import React, { useState } from 'react';
import { MARKETING_CATEGORIES } from '../constants';
import { generateMarketingPlan } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';

const AIAssistant: React.FC = () => {
  const [shopDescription, setShopDescription] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState('');
  const [error, setError] = useState('');

  const handleTopicChange = (topicName: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicName)
        ? prev.filter(t => t !== topicName)
        : [...prev, topicName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopDescription || selectedTopics.length === 0) {
      setError('Please describe your shop and select at least one marketing topic.');
      return;
    }
    setError('');
    setIsLoading(true);
    setPlan('');

    try {
      const result = await generateMarketingPlan(shopDescription, selectedTopics);
      setPlan(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="bg-stone-800 text-white rounded-2xl p-8 md:p-12 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
          <SparklesIcon className="w-8 h-8 text-amber-400" />
          AI Marketing Strategist
        </h2>
        <p className="mt-4 text-lg text-stone-300 max-w-3xl mx-auto">
          Tell me about your coffee shop and select the areas you're interested in. I'll brew up a custom marketing plan just for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="mb-6">
          <label htmlFor="shopDescription" className="block text-lg font-semibold mb-2 text-amber-400">1. Describe Your Coffee Shop</label>
          <textarea
            id="shopDescription"
            value={shopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            placeholder="e.g., 'A cozy, minimalist cafe near a university, focusing on single-origin pour-overs and providing a quiet space for students to study.'"
            className="w-full h-28 p-4 bg-stone-700 border-2 border-stone-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="mb-8">
          <label className="block text-lg font-semibold mb-3 text-amber-400">2. Choose Your Focus Areas</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {MARKETING_CATEGORIES.map(cat => (
              <label key={cat.id} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${selectedTopics.includes(cat.name) ? 'bg-amber-500 border-amber-400' : 'bg-stone-700 border-stone-600 hover:bg-stone-600'}`}>
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(cat.name)}
                  onChange={() => handleTopicChange(cat.name)}
                  className="hidden"
                />
                <span className="font-semibold text-sm">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 text-stone-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-400 transition-transform duration-200 transform hover:scale-105 disabled:bg-stone-500 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
          >
            {isLoading ? <><LoadingSpinner size="sm" /> Generating Plan...</> : 'Generate Marketing Plan'}
          </button>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
      </form>

      {plan && (
        <div className="mt-12 bg-stone-900/50 p-6 md:p-8 rounded-lg border border-stone-700">
           <h3 className="text-2xl font-bold text-amber-400 mb-4">Your Custom Marketing Plan</h3>
            {/* Fix: Improved markdown rendering to handle paragraphs, headings, bold, and lists. */}
           <div
              className="prose prose-invert max-w-none prose-headings:text-amber-300 prose-strong:text-white"
              dangerouslySetInnerHTML={{
                __html: plan
                  .split(/\n\s*\n/)
                  .map((paragraph) => {
                    let p = paragraph.trim();
                    if (!p) return '';

                    p = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                    if (p.startsWith('# ')) return `<h1>${p.substring(2)}</h1>`;
                    if (p.startsWith('## ')) return `<h2>${p.substring(2)}</h2>`;
                    if (p.startsWith('### ')) return `<h3>${p.substring(3)}</h3>`;

                    if (p.startsWith('- ')) {
                      const listItems = p
                        .split('\n')
                        .map((line) => `<li>${line.substring(2).trim()}</li>`)
                        .join('');
                      return `<ul>${listItems}</ul>`;
                    }

                    return `<p>${p.replace(/\n/g, '<br/>')}</p>`;
                  })
                  .join(''),
              }}
            />
        </div>
      )}
    </section>
  );
};

export default AIAssistant;

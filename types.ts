
import React from 'react';

export interface MarketingStrategy {
  id: string;
  name: string;
  description: string;
}

export interface MarketingCategory {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  strategies: MarketingStrategy[];
}

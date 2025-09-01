
import React from 'react';
import type { MarketingCategory } from './types';
import { DigitalIcon } from './components/icons/DigitalIcon';
import { LocalIcon } from './components/icons/LocalIcon';
import { LoyaltyIcon } from './components/icons/LoyaltyIcon';
import { PaidAdsIcon } from './components/icons/PaidAdsIcon';
import { AIIcon } from './components/icons/AIIcon';

export const MARKETING_CATEGORIES: MarketingCategory[] = [
  {
    id: 'digital_presence',
    name: 'Digital Presence',
    description: 'Build your online foundation.',
    icon: DigitalIcon,
    strategies: [
      { id: 'website', name: 'Coffee Shop Website', description: 'Your online storefront.' },
      { id: 'social_media', name: 'Social Media Marketing', description: 'Engage with customers on platforms like Instagram & TikTok.' },
      { id: 'local_seo', name: 'Local SEO', description: 'Appear in "coffee near me" searches on Google Maps.' },
      { id: 'online_reviews', name: 'Online Review Management', description: 'Manage your reputation on Yelp and Google.' },
    ],
  },
  {
    id: 'local_marketing',
    name: 'Local & Community Marketing',
    description: 'Connect with your neighborhood.',
    icon: LocalIcon,
    strategies: [
      { id: 'events', name: 'In-Store Events & Workshops', description: 'Host latte art classes, live music, or tasting events.' },
      { id: 'partnerships', name: 'Local Business Partnerships', description: 'Collaborate with nearby offices, bookstores, or boutiques.' },
      { id: 'flyers', name: 'Flyers & Local Press', description: 'Classic outreach for community notice boards and papers.' },
      { id: 'community_sponsorship', name: 'Community Sponsorship', description: 'Sponsor a local sports team or community garden.' },
    ],
  },
  {
    id: 'customer_loyalty',
    name: 'Customer Loyalty & Retention',
    description: 'Turn one-time visitors into regulars.',
    icon: LoyaltyIcon,
    strategies: [
      { id: 'loyalty_program', name: 'Loyalty Program', description: 'Implement a digital or physical punch card system.' },
      { id: 'email_marketing', name: 'Email & SMS Marketing', description: 'Send newsletters with offers and updates.' },
      { id: 'customer_feedback', name: 'Gather Customer Feedback', description: 'Use surveys to improve your service and offerings.' },
      { id: 'personalized_offers', name: 'Personalized Offers', description: 'Special discounts on customers\' birthdays.' },
    ],
  },
  {
    id: 'paid_advertising',
    name: 'Paid Advertising',
    description: 'Reach a wider, targeted audience.',
    icon: PaidAdsIcon,
    strategies: [
      { id: 'social_media_ads', name: 'Social Media Ads', description: 'Target local users on Instagram and Facebook.' },
      { id: 'google_ads', name: 'Google Ads', description: 'Capture demand from people searching for coffee shops.' },
      { id: 'influencer_marketing', name: 'Local Influencer Marketing', description: 'Partner with local food bloggers.' },
    ],
  },
  {
    id: 'ai_powered',
    name: 'AI-Powered Marketing',
    description: 'Leverage AI for creative and efficient marketing.',
    icon: AIIcon,
    strategies: [
      { id: 'ai_content_gen', name: 'AI Content Generation', description: 'Create social media captions, blog posts, and emails.' },
      { id: 'ai_social_management', name: 'AI Social Media Management', description: 'Use AI to schedule posts and analyze performance.' },
      { id: 'ai_customer_insights', name: 'AI for Customer Insights', description: 'Analyze review data to find common themes.' },
      { id: 'ai_ad_creatives', name: 'AI Ad Creatives', description: 'Generate images and video ideas for your ads.' },
    ],
  },
];

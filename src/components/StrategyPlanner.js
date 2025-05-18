import React, { useState } from 'react';

const StrategyPlanner = ({ setContentStrategy }) => {
  const [strategyType, setStrategyType] = useState('growth');
  const [timeline, setTimeline] = useState('6-months');
  const [monetization, setMonetization] = useState('freemium');

  const generateStrategy = () => {
    const strategy = {
      type: strategyType,
      timeline: timeline,
      monetization: monetization,
      recommendations: [
        {
          phase: 'Phase 1: Foundation (Weeks 1-4)',
          actions: [
            'Define your unique value proposition',
            'Set up email welcome sequence',
            'Create 3 cornerstone content pieces',
            'Design newsletter template'
          ]
        },
        {
          phase: 'Phase 2: Growth (Weeks 5-12)',
          actions: [
            'Implement cross-promotion with 3 related newsletters',
            'Create Twitter thread strategy from newsletter content',
            'Launch referral program',
            'Establish consistent publishing schedule'
          ]
        },
        {
          phase: 'Phase 3: Monetization (Weeks 13-24)',
          actions: [
            'Introduce premium tier with exclusive content',
            'Create lead magnet for email collection',
            'Develop community aspect',
            'Experiment with sponsored sections'
          ]
        }
      ]
    };
    setContentStrategy(strategy);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Strategic Growth Planner</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Strategy Focus</label>
          <select
            value={strategyType}
            onChange={(e) => setStrategyType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="growth">Subscriber Growth</option>
            <option value="engagement">Reader Engagement</option>
            <option value="conversion">Paid Conversion</option>
            <option value="authority">Authority Building</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Timeline</label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="3-months">3 Months</option>
            <option value="6-months">6 Months</option>
            <option value="12-months">12 Months</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Monetization Model</label>
          <select
            value={monetization}
            onChange={(e) => setMonetization(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="freemium">Freemium (Free + Paid Tiers)</option>
            <option value="sponsorship">Sponsorships & Ads</option>
            <option value="community">Community & Events</option>
            <option value="products">Digital Products</option>
          </select>
        </div>
      </div>
      <button
        onClick={generateStrategy}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        Generate Growth Strategy
      </button>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Growth Playbook Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">The 10K Sprint</h4>
            <p className="text-sm text-gray-600 mb-4">0 to 10,000 subscribers in 90 days</p>
            <ul className="text-sm space-y-2">
              <li>• High-frequency publishing (3x/week)</li>
              <li>• Twitter/LinkedIn distribution strategy</li>
              <li>• Guest newsletter swaps</li>
              <li>• Viral referral incentives</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">The Authority Builder</h4>
            <p className="text-sm text-gray-600 mb-4">Position yourself as the go-to expert</p>
            <ul className="text-sm space-y-2">
              <li>• Deep, research-backed content</li>
              <li>• Expert interviews series</li>
              <li>• Data-driven industry reports</li>
              <li>• Podcast & speaking appearances</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">The Revenue Maximizer</h4>
            <p className="text-sm text-gray-600 mb-4">Focus on paid conversion</p>
            <ul className="text-sm space-y-2">
              <li>• Premium content teasers</li>
              <li>• Limited-time promotions</li>
              <li>• Exclusive community access</li>
              <li>• Tiered membership structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyPlanner;

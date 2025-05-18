import React, { useState } from 'react';

const AudienceResearch = ({ setActiveNiche }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState(null);

  const trendingNiches = [
    { id: 1, name: 'AI and Future of Work', growth: '+127%', subscribers: '145K', paidConversion: '4.8%' },
    { id: 2, name: 'Creator Economy', growth: '+84%', subscribers: '97K', paidConversion: '5.2%' },
    { id: 3, name: 'Climate Tech', growth: '+61%', subscribers: '73K', paidConversion: '3.9%' },
    { id: 4, name: 'Mental Health', growth: '+52%', subscribers: '118K', paidConversion: '4.1%' },
    { id: 5, name: 'Web3 & Crypto', growth: '+43%', subscribers: '156K', paidConversion: '6.7%' },
  ];

  const searchAudiences = async () => {
    setSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResults([
        { id: 6, name: 'Personal Finance for Millennials', growth: '+38%', subscribers: '89K', paidConversion: '5.4%' },
        { id: 7, name: 'Sustainable Living', growth: '+42%', subscribers: '62K', paidConversion: '3.8%' },
        { id: 8, name: 'Health Tech', growth: '+49%', subscribers: '71K', paidConversion: '4.7%' },
      ]);
    } catch (error) {
      console.error('Failed to search audiences:', error);
    } finally {
      setSearching(false);
    }
  };

  const selectNiche = (niche) => {
    setSelectedNiche(niche);
    setActiveNiche(niche.name);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Audience Research</h2>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Discover growing niches</label>
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, interests, or demographics..."
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={searchAudiences}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-r-lg"
          >
            Search
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Trending Niches on Substack</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niche</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Subscribers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trendingNiches.map((niche) => (
                <tr key={niche.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{niche.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">{niche.growth}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{niche.subscribers}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{niche.paidConversion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => selectNiche(niche)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
              {results.map((niche) => (
                <tr key={niche.id} className="bg-indigo-50">
                  <td className="px-6 py-4 whitespace-nowrap">{niche.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">{niche.growth}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{niche.subscribers}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{niche.paidConversion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => selectNiche(niche)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedNiche && (
        <div className="bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Selected Niche: {selectedNiche.name}</h3>
          <p className="mb-4">This niche has shown consistent growth of {selectedNiche.growth} over the past 12 months, with an average newsletter size of {selectedNiche.subscribers}.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold mb-2">Top Substack Competitors</h4>
              <ul className="space-y-2">
                <li>• The Future of Work by James Smith (217K subscribers)</li>
                <li>• Work Reimagined by Emily Johnson (189K subscribers)</li>
                <li>• AI Weekly by Tech Insights (156K subscribers)</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold mb-2">Content That Performs Best</h4>
              <ul className="space-y-2">
                <li>• Case studies of companies adopting AI</li>
                <li>• Step-by-step guides on implementing automation</li>
                <li>• Interviews with industry leaders</li>
                <li>• Roundups of new AI tools and technologies</li>
              </ul>
            </div>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
            Generate Content Strategy
          </button>
        </div>
      )}
    </div>
  );
};

export default AudienceResearch;

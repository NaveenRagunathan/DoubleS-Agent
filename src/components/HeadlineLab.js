import React, { useState } from 'react';

const HeadlineLab = () => {
  const [topic, setTopic] = useState('');
  const [headlines, setHeadlines] = useState([]);

  const generateHeadlines = async () => {
    setTimeout(() => {
      const generatedHeadlines = [
        {
          text: `The Untold Truth About ${topic}: What Insiders Won't Tell You`,
          score: 94,
          notes: "Appeals to curiosity and exclusivity"
        },
        {
          text: `Why ${topic} Is About to Change Everything (And How to Be Prepared)` ,
          score: 91,
          notes: "Creates urgency and offers value"
        },
        {
          text: `I Studied ${topic} for 10 Years. Here's What Nobody Realizes`,
          score: 89,
          notes: "Establishes authority and promises insights"
        },
        {
          text: `The ${topic} Playbook: 5 Strategies That Actually Work`,
          score: 87,
          notes: "Practical, actionable content promise"
        },
        {
          text: `How I Went From Knowing Nothing About ${topic} to Mastering It in 30 Days`,
          score: 85,
          notes: "Transformation story with timeframe"
        }
      ];
      setHeadlines(generatedHeadlines);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Headline Laboratory</h2>
      <p className="text-gray-600 mb-6">Your headline is the most important element of your newsletter. It determines whether someone opens your email or scrolls past. Let's craft headlines that are impossible to ignore.</p>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">What's your topic?</label>
        <div className="flex">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., productivity, crypto investing, climate change..."
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={generateHeadlines}
            disabled={!topic}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-r-lg disabled:bg-gray-400"
          >
            Generate Headlines
          </button>
        </div>
      </div>
      {headlines.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Your Viral-Worthy Headlines</h3>
          <div className="space-y-4">
            {headlines.map((headline, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-lg">{headline.text}</h4>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    Score: {headline.score}/100
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{headline.notes}</p>
                <div className="mt-3 flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Use This</button>
                  <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">Edit</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-2">What Makes These Headlines Work</h4>
            <p className="text-sm text-gray-700 mb-3">Analysis of the psychological triggers that make these headlines more likely to be opened:</p>
            <ul className="text-sm space-y-2">
              <li>• <strong>Curiosity gaps</strong> - Creating knowledge asymmetry that readers want to resolve</li>
              <li>• <strong>Exclusivity</strong> - Implying "insider" information not widely known</li>
              <li>• <strong>Authority</strong> - Signaling expertise and deep knowledge</li>
              <li>• <strong>Utility</strong> - Promising practical, immediately useful information</li>
              <li>• <strong>Specificity</strong> - Using numbers and concrete details for credibility</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadlineLab;

import React, { useState } from 'react';
import _ from 'lodash';

const ContentGenerator = ({ setGeneratedContent, activeNiche, contentStrategy, setLoading }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('authoritative');
  const [length, setLength] = useState('medium');
  const [contentType, setContentType] = useState('deep-dive');
  const [includeElements, setIncludeElements] = useState({
    stories: true,
    data: true,
    actionItems: true,
    hooks: true
  });

  const generateContent = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newContent = {
        id: Date.now(),
        title: `${_.capitalize(contentType)}: ${_.capitalize(topic)}`,
        sections: [
          {
            type: 'introduction',
            content: `This would be an attention-grabbing introduction about ${topic} written in a ${tone} tone. It would include a powerful hook and establish credibility immediately.`
          },
          {
            type: 'main-content',
            content: `This would be the main content about ${topic}, including research, analysis, and insights. For a ${length} piece, this would be comprehensive and valuable.`
          },
          {
            type: 'examples',
            content: 'This section would contain relevant examples and case studies.'
          },
          {
            type: 'conclusion',
            content: 'This would be a compelling conclusion with clear next steps and a call to action.'
          }
        ],
        metadata: {
          estimatedReadTime: length === 'short' ? '4 min' : length === 'medium' ? '7 min' : '12 min',
          targetAudience: activeNiche || 'General audience',
          viralPotentialScore: Math.floor(Math.random() * 30) + 70
        }
      };
      setGeneratedContent(prev => [newContent, ...prev]);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Newsletter Content Generator</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">What's your newsletter about?</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., The future of remote work, AI ethics, personal finance basics..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="authoritative">Authoritative</option>
              <option value="conversational">Conversational</option>
              <option value="provocative">Provocative</option>
              <option value="inspirational">Inspirational</option>
              <option value="analytical">Analytical</option>
              <option value="storytelling">Storytelling</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="short">Short (500-800 words)</option>
              <option value="medium">Medium (1000-1500 words)</option>
              <option value="long">Long (2000+ words)</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Content Type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="deep-dive">Deep Dive Analysis</option>
              <option value="how-to">How-To Guide</option>
              <option value="opinion">Opinion/Commentary</option>
              <option value="roundup">Industry Roundup</option>
              <option value="case-study">Case Study</option>
              <option value="interview">Expert Interview</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Must-include elements</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={includeElements.stories}
                onChange={() => setIncludeElements({...includeElements, stories: !includeElements.stories})}
                className="mr-2"
              />
              <span>Personal stories</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={includeElements.data}
                onChange={() => setIncludeElements({...includeElements, data: !includeElements.data})}
                className="mr-2"
              />
              <span>Data/stats</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={includeElements.actionItems}
                onChange={() => setIncludeElements({...includeElements, actionItems: !includeElements.actionItems})}
                className="mr-2"
              />
              <span>Action items</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={includeElements.hooks}
                onChange={() => setIncludeElements({...includeElements, hooks: !includeElements.hooks})}
                className="mr-2"
              />
              <span>Powerful hooks</span>
            </div>
          </div>
        </div>
        <button
          onClick={generateContent}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Generate Newsletter Content
        </button>
      </div>
    </div>
  );
};

export default ContentGenerator;

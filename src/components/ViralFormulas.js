import React, { useState } from 'react';

const templates = [
  {
    id: 1,
    name: "The Contrarian Take",
    description: "Challenge conventional wisdom with a well-reasoned argument",
    structure: [
      { section: "Hook", description: "Present a commonly held belief in your niche" },
      { section: "Pattern Interrupt", description: "State why this belief is flawed" },
      { section: "Evidence", description: "Provide 3-5 pieces of evidence supporting your contrarian position" },
      { section: "Nuance", description: "Acknowledge the complexity and show when the conventional wisdom might apply" },
      { section: "New Framework", description: "Offer your alternative perspective or model" },
      { section: "Call to Action", description: "Invite engagement with your controversial take" }
    ],
    examples: [
      "Why Working Less Hours Will Make You More Productive",
      "The Problem with 'Follow Your Passion' Advice",
      "Why Morning Routines Are Actually Holding You Back"
    ],
    virality: 92
  },
  {
    id: 2,
    name: "The Masterclass Breakdown",
    description: "Deep analysis of how someone or something achieved extraordinary success",
    structure: [
      { section: "Result Highlight", description: "Feature the impressive outcome or achievement" },
      { section: "Background Context", description: "Provide necessary context and stakes" },
      { section: "Strategic Overview", description: "Outline the high-level approach" },
      { section: "Step-by-Step Analysis", description: "Break down each key decision or action" },
      { section: "Lessons & Principles", description: "Extract general principles readers can apply" },
      { section: "Implementation Guide", description: "Give readers a starting point to apply these lessons" }
    ],
    examples: [
      "How This Newsletter Grew to 500K Subscribers in 18 Months",
      "Breaking Down Apple's iPhone Launch Strategy",
      "Inside Notion's $10B Valuation: The Product Decisions That Changed Everything"
    ],
    virality: 89
  },
  {
    id: 3,
    name: "The Prediction Framework",
    description: "Methodical approach to predicting future trends in your industry",
    structure: [
      { section: "Bold Prediction", description: "State a specific, timeline-bound prediction" },
      { section: "Current Signals", description: "Identify early indicators already visible" },
      { section: "Historical Patterns", description: "Connect to similar historical shifts" },
      { section: "Counterarguments", description: "Address reasons your prediction might be wrong" },
      { section: "Implications", description: "Explain who wins and loses if you're right" },
      { section: "Action Steps", description: "How readers should prepare for this future" }
    ],
    examples: [
      "Why Remote Work Will Be Dead by 2026",
      "The Next Social Media Giant: Predicting What Comes After Instagram",
      "The End of Traditional College Degrees Is Coming Faster Than You Think"
    ],
    virality: 87
  }
];

const ViralFormulas = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Viral Formula Templates</h2>
      <p className="text-gray-600 mb-6">These proven content formulas have helped Substack writers consistently create viral newsletters. Select a template to start crafting your own high-performing content.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <div 
            key={template.id} 
            className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${selectedTemplate?.id === template.id ? 'ring-2 ring-indigo-500 bg-indigo-50' : 'hover:border-indigo-300'}`}
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{template.name}</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                {template.virality}% Viral
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{template.description}</p>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Select Template
            </button>
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-bold mb-4">{selectedTemplate.name} Formula</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold mb-3">Content Structure</h4>
              <div className="space-y-3">
                {selectedTemplate.structure.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium">{index + 1}. {item.section}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">Success Examples</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {selectedTemplate.examples.map((example, index) => (
                    <li key={index} className="text-indigo-700">• {example}</li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-medium mb-2">Why This Works</h5>
                  <p className="text-sm text-gray-600">
                    This formula leverages psychological principles of curiosity, pattern disruption, and insight delivery. 
                    It positions you as a thought leader who sees what others miss, while providing genuine value through 
                    well-structured analysis.
                  </p>
                </div>
              </div>
              <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViralFormulas;

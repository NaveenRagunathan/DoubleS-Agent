import React from 'react';

const MetricCard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-sm font-medium text-green-600 mt-1">{change} this month</p>
      </div>
      <span className="text-indigo-600 opacity-80">{/* Icon placeholder */}</span>
    </div>
  </div>
);

const ActionButton = ({ title, description, onClick, icon }) => (
  <button
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-indigo-300 hover:shadow-md transition duration-200"
  >
    <h4 className="font-bold text-lg mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </button>
);

const Dashboard = ({ metrics, setView }) => (
  <div className="dashboard">
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to your Substack Success Command Center</h2>
      <p className="text-gray-700 mb-4">Your newsletter growth assistant powered by AI. Let's build your Substack empire together.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <MetricCard title="Subscribers" value={metrics.currentSubscribers} change="+12%" icon="users" />
        <MetricCard title="Open Rate" value={`${metrics.openRate}%`} change="+2.4%" icon="mail-open" />
        <MetricCard title="Conversion Rate" value={`${metrics.conversionRate}%`} change="+0.8%" icon="trending-up" />
        <MetricCard title="Growth Rate" value={`${metrics.growthRate}%`} change="+5.2%" icon="chart" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <ActionButton title="Generate Newsletter" description="Create viral-worthy content" onClick={() => setView('content-generator')} icon="file-text" />
          <ActionButton title="Headline Lab" description="Craft irresistible headlines" onClick={() => setView('headline-lab')} icon="type" />
          <ActionButton title="Audience Research" description="Understand your readers" onClick={() => setView('audience-research')} icon="users" />
          <ActionButton title="Viral Formulas" description="Templates that convert" onClick={() => setView('viral-formulas')} icon="zap" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Growth Insights</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="inline-block mr-3 mt-1 bg-green-100 text-green-800 p-1 rounded-full">✓</span>
            <div>
              <p className="font-medium">Optimize publishing time</p>
              <p className="text-sm text-gray-600">Data suggests Tuesdays at 10am increases open rates by 23%</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="inline-block mr-3 mt-1 bg-green-100 text-green-800 p-1 rounded-full">✓</span>
            <div>
              <p className="font-medium">Add more personal stories</p>
              <p className="text-sm text-gray-600">Newsletters with personal anecdotes see 31% higher engagement</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="inline-block mr-3 mt-1 bg-green-100 text-green-800 p-1 rounded-full">✓</span>
            <div>
              <p className="font-medium">Experiment with multimedia</p>
              <p className="text-sm text-gray-600">Newsletters with embedded images see 42% higher click-through</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MetricCard = ({ title, value, change, icon }) => {
  const getIcon = (iconName) => {
    const icons = {
      users: '👥',
      'mail-open': '✉️',
      'trending-up': '📈',
      chart: '📊',
    };
    return icons[iconName] || '📊';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className={`text-sm font-medium mt-1 ${
            change.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>
            {change} this month
          </p>
        </div>
        <span className="text-2xl opacity-70">{getIcon(icon)}</span>
      </div>
    </div>
  );
};

const ActionCard = ({ title, description, to, icon }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-indigo-300 hover:shadow-md transition duration-200 h-full w-full"
    >
      <div className="flex items-center mb-2">
        <span className="text-indigo-600 mr-2">{icon}</span>
        <h4 className="font-bold text-lg">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
};

const ActivityItem = ({ title, description, time, type = 'info' }) => {
  const getTypeStyles = () => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };
    return styles[type] || styles.info;
  };

  return (
    <div className="flex items-start space-x-3">
      <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${getTypeStyles()}`}></div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [metrics] = useState({
    currentSubscribers: '1,248',
    openRate: 42.5,
    conversionRate: 3.8,
    growthRate: 5.2,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="dashboard p-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name?.split(' ')[0] || 'Writer'}! 👋
        </h2>
        <p className="text-gray-700 mb-6">
          Your newsletter growth assistant is ready to help. Here's what's happening with your Substack.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Subscribers" 
            value={metrics.currentSubscribers} 
            change="+12%" 
            icon="users" 
          />
          <MetricCard 
            title="Open Rate" 
            value={`${metrics.openRate}%`} 
            change={metrics.openRate > 40 ? "+2.4%" : "-1.2%"} 
            icon="mail-open" 
          />
          <MetricCard 
            title="Conversion" 
            value={`${metrics.conversionRate}%`} 
            change={metrics.conversionRate > 3 ? "+0.8%" : "-0.3%"} 
            icon="trending-up" 
          />
          <MetricCard 
            title="Growth" 
            value={`${metrics.growthRate}%`} 
            change={metrics.growthRate > 0 ? `+${metrics.growthRate}%` : `${metrics.growthRate}%`} 
            icon="chart" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ActionCard 
                title="New Post" 
                description="Write and publish your next article" 
                to="/content-generator" 
                icon="✍️"
              />
              <ActionCard 
                title="Headline Lab" 
                description="Craft irresistible headlines" 
                to="/headline-lab" 
                icon="📝"
              />
              <ActionCard 
                title="Audience Insights" 
                description="Understand your readers" 
                to="/audience-research" 
                icon="👥"
              />
              <ActionCard 
                title="Growth Tools" 
                description="Expand your reach" 
                to="/viral-formulas" 
                icon="🚀"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem 
              title="New subscribers" 
              description="+24 new subscribers this week" 
              time="2 hours ago"
              type="success"
            />
            <ActivityItem 
              title="Post published" 
              description="Your article was published successfully" 
              time="1 day ago"
              type="info"
            />
            <ActivityItem 
              title="Performance alert" 
              description="Your open rate dropped by 2%" 
              time="3 days ago"
              type="warning"
            />
          </div>
          <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View all activity →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Double S Agent: Substack Success Partner
// Main App Component
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Dashboard from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import AudienceResearch from './components/AudienceResearch';
import StrategyPlanner from './components/StrategyPlanner';
import Analytics from './components/Analytics';
import HeadlineLab from './components/HeadlineLab';
import ViralFormulas from './components/ViralFormulas';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeNiche, setActiveNiche] = useState(null);
  const [contentStrategy, setContentStrategy] = useState(null);
  const [generatedContent, setGeneratedContent] = useState([]);
  const [metrics, setMetrics] = useState({
    openRate: 0,
    conversionRate: 0,
    growthRate: 0,
    currentSubscribers: 0
  });
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };
    loadUserData();
  }, []);

  return (
    <div className="app-container bg-gray-100 min-h-screen">
      <Header user={user} setView={setView} />
      <main className="container mx-auto px-4 py-8">
        {view === 'dashboard' && <Dashboard metrics={metrics} setView={setView} />}
        {view === 'content-generator' && <ContentGenerator 
          setGeneratedContent={setGeneratedContent} 
          activeNiche={activeNiche}
          contentStrategy={contentStrategy}
          setLoading={setLoading}
        />}
        {view === 'audience-research' && <AudienceResearch setActiveNiche={setActiveNiche} />}
        {view === 'strategy' && <StrategyPlanner setContentStrategy={setContentStrategy} />}
        {view === 'analytics' && <Analytics metrics={metrics} setMetrics={setMetrics} />}
        {view === 'headline-lab' && <HeadlineLab />}
        {view === 'viral-formulas' && <ViralFormulas />}
      </main>
      <Footer />
    </div>
  );
};

export default App;

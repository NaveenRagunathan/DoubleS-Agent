// Double S Agent: Substack Success Partner
// Main App Component
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import PasswordReset from './components/auth/PasswordReset';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./components/Dashboard'));
const ContentGenerator = lazy(() => import('./pages/ContentGenerator'));
const AudienceResearch = lazy(() => import('./components/AudienceResearch'));
const StrategyPlanner = lazy(() => import('./components/StrategyPlanner'));
const Analytics = lazy(() => import('./components/Analytics'));
const HeadlineLab = lazy(() => import('./components/HeadlineLab'));
const ViralFormulas = lazy(() => import('./components/ViralFormulas'));

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

const AppContent = () => {
  const { user } = useAuth();
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

  return (
    <div className="app-container bg-gray-100 min-h-screen">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/forgot-password" element={<PasswordReset />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={
                <Dashboard 
                  activeNiche={activeNiche}
                  setActiveNiche={setActiveNiche}
                  contentStrategy={contentStrategy}
                  setContentStrategy={setContentStrategy}
                  metrics={metrics}
                  setMetrics={setMetrics}
                  loading={loading}
                  setLoading={setLoading}
                />
              } />
              <Route path="/content-generator" element={
                <ContentGenerator />
              } />
              <Route path="/audience-research" element={
                <AudienceResearch 
                  activeNiche={activeNiche}
                  loading={loading}
                  setLoading={setLoading}
                />
              } />
              <Route path="/strategy-planner" element={
                <StrategyPlanner 
                  contentStrategy={contentStrategy}
                  setContentStrategy={setContentStrategy}
                  loading={loading}
                  setLoading={setLoading}
                />
              } />
              <Route path="/analytics" element={
                <Analytics 
                  metrics={metrics}
                  loading={loading}
                  setLoading={setLoading}
                />
              } />
              <Route path="/headline-lab" element={
                <HeadlineLab 
                  activeNiche={activeNiche}
                  loading={loading}
                  setLoading={setLoading}
                />
              } />
              <Route path="/viral-formulas" element={
                <ViralFormulas 
                  activeNiche={activeNiche}
                  loading={loading}
                  setLoading={setLoading}
                />
              } />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AppContent;

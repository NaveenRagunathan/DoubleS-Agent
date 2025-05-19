import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ContentForm from '../components/content-generator/ContentForm';
import ContentPreview from '../components/content-generator/ContentPreview';
import ContentHistory from '../components/content-generator/ContentHistory';
import { FiArrowLeft, FiMenu, FiX } from 'react-icons/fi';

const ContentGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async (content) => {
    setGeneratedContent(content);
    setShowHistory(false);
  };

  const handleEdit = () => {
    // Scroll to the form
    document.getElementById('content-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleHistorySelect = (content) => {
    setGeneratedContent(content);
    setShowHistory(false);
  };

  const handleClear = () => {
    setGeneratedContent('');
  };

  if (!user) {
    navigate('/login', { state: { from: '/content-generator' } });
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiArrowLeft className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Content Generator</h1>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {showHistory ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - History (hidden on mobile when not active) */}
          <div 
            className={`lg:col-span-1 ${showHistory ? 'block' : 'hidden'} lg:block`}
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Your Content</h2>
                {generatedContent && (
                  <button
                    onClick={handleClear}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Clear
                  </button>
                )}
              </div>
              <ContentHistory 
                onSelect={handleHistorySelect} 
                onDelete={() => setGeneratedContent('')}
              />
            </div>
          </div>

          {/* Main content area */}
          <div className={`${showHistory ? 'hidden' : 'block'} lg:block lg:col-span-2`}>
            {/* Form Section */}
            <div id="content-form" className="mb-8">
              <ContentForm 
                onGenerate={handleGenerate} 
                loading={isLoading}
                setLoading={setIsLoading}
              />
            </div>

            {/* Preview Section */}
            <div className="mt-8">
              <ContentPreview 
                content={generatedContent} 
                onEdit={handleEdit}
                isGenerating={isLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentGenerator;

import React, { useState } from 'react';
import { FiCopy, FiSave, FiEdit2, FiShare2 } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ContentPreview = ({ content, onEdit, isGenerating }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!content || !user) return;
    
    setIsSaving(true);
    setError('');
    
    try {
      await axios.post(
        '/api/content/save',
        { content },
        { withCredentials: true }
      );
      // You might want to update the content history here
    } catch (err) {
      console.error('Failed to save content:', err);
      setError('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    // Implement sharing functionality
    console.log('Sharing content:', content);
  };

  if (isGenerating) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-64">
        <p className="text-gray-500">Your generated content will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Generated Content</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            title="Copy to clipboard"
          >
            <FiCopy className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Save content"
          >
            <FiSave className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit()}
            className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            title="Edit content"
          >
            <FiEdit2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            title="Share content"
          >
            <FiShare2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {isCopied && (
        <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm text-center">
          Copied to clipboard!
        </div>
      )}

      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
      </div>
    </div>
  );
};

// Helper function to format content with line breaks and basic formatting
const formatContent = (content) => {
  if (!content) return '';
  
  // Convert markdown-style headers
  let formatted = content
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold my-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium my-2">$1</h3>');
  
  // Convert line breaks to <p> tags
  formatted = formatted
    .split('\n\n')
    .map(paragraph => {
      if (!paragraph.trim()) return '';
      // Check if paragraph is already wrapped in a header tag
      if (paragraph.startsWith('<h')) return paragraph;
      return `<p class="mb-4">${paragraph}</p>`;
    })
    .join('');
  
  return formatted;
};

export default ContentPreview;

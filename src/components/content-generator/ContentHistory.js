import React, { useState, useEffect } from 'react';
import { FiClock, FiCopy, FiTrash2, FiEye } from 'react-icons/fi';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const ContentHistory = ({ onSelect, onDelete }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchContentHistory();
  }, []);

  const fetchContentHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/content/history', {
        withCredentials: true
      });
      setHistory(response.data || []);
    } catch (err) {
      console.error('Failed to fetch content history:', err);
      setError('Failed to load content history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    
    try {
      await axios.delete(`/api/content/${id}`, {
        withCredentials: true
      });
      
      // Remove from local state
      setHistory(prev => prev.filter(item => item._id !== id));
      
      // Notify parent if the deleted item was selected
      if (onDelete && selectedId === id) {
        onDelete();
      }
    } catch (err) {
      console.error('Failed to delete content:', err);
      setError('Failed to delete content');
    }
  };

  const handleSelect = (item) => {
    setSelectedId(item._id);
    if (onSelect) {
      onSelect(item.content);
    }
  };

  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n) + '...' : str;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500">
        <p>No content history yet. Generate some content to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div
          key={item._id}
          onClick={() => handleSelect(item)}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedId === item._id
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.title || 'Untitled'}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {truncate(item.content, 100)}
              </p>
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <FiClock className="mr-1" />
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </div>
            </div>
            <div className="flex space-x-1 ml-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(item.content);
                }}
                className="p-1 text-gray-400 hover:text-indigo-600 rounded hover:bg-gray-100"
                title="Copy content"
              >
                <FiCopy className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleDelete(item._id, e)}
                className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100"
                title="Delete content"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentHistory;

import React from 'react';

const Header = ({ user, setView }) => {
  return (
    <header className="bg-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Double S Agent</h1>
          <span className="ml-2 text-sm bg-yellow-500 text-black px-2 py-1 rounded-full">BETA</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><button onClick={() => setView('dashboard')} className="hover:text-yellow-300">Dashboard</button></li>
            <li><button onClick={() => setView('content-generator')} className="hover:text-yellow-300">Content Generator</button></li>
            <li><button onClick={() => setView('audience-research')} className="hover:text-yellow-300">Audience Research</button></li>
            <li><button onClick={() => setView('strategy')} className="hover:text-yellow-300">Strategy Planner</button></li>
            <li><button onClick={() => setView('analytics')} className="hover:text-yellow-300">Analytics</button></li>
            <li><button onClick={() => setView('headline-lab')} className="hover:text-yellow-300">Headline Lab</button></li>
            <li><button onClick={() => setView('viral-formulas')} className="hover:text-yellow-300">Viral Formulas</button></li>
          </ul>
        </nav>
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">{user.name}</span>
            <img src={user.avatar || "/api/placeholder/40/40"} alt="User avatar" className="w-8 h-8 rounded-full" />
          </div>
        ) : (
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

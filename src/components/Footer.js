import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Double S Agent</h3>
            <p className="text-sm">&copy; {new Date().getFullYear()} Substack Success Partner. All rights reserved.</p>
          </div>
          <div>
            <a href="https://substack.com/" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium ml-4">Learn More</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

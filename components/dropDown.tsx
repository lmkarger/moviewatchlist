'use state';

import { useState, useRef, useEffect } from 'react';

export default function DropdownForm() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-5 m-3 text-xl rounded-full hover:p-6 hover:m-2"
      >
        {isOpen ? 'Close Form' : 'Add Movie'}
      </button>

      {/* Dropdown Form with Animation */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 mt-2 w-150 bg-gray-800 border-blue-500 border-6 rounded shadow-lg p-10 z-1000
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        <form className="space-y-3 z-10">
          <input
            type="text"
            placeholder="Name..."
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#D3D3D3]"
          />
          <input
            type="number"
            min="0"
            max="10"
            placeholder="Rating..."
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#D3D3D3]"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

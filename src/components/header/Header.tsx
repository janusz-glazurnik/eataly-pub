import React, { useState } from 'react';
import Logo from '../../assets/logo.svg';
import { NavLink } from 'react-router';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Eataly Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-gray-800">Eataly</h1>
        </div>

        <nav className="hidden md:flex space-x-6">
          <NavLink to="/" className="text-gray-600 hover:text-gray-900" end>
            Home
          </NavLink>
          <NavLink to="/expenses" className="text-gray-600 hover:text-gray-900">
            Expenses
          </NavLink>
          <NavLink to="/groups" className="text-gray-600 hover:text-gray-900">
            Groups
          </NavLink>
          <NavLink to="/stats" className="text-gray-600 hover:text-gray-900">
            Stats
          </NavLink>
          <NavLink to="/settings" className="text-gray-600 hover:text-gray-900">
            Settings
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute top-16 right-6 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Expenses
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Groups
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Settings
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

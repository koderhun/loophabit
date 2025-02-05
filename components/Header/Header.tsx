import React, { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Логотип */}
        <div className="text-2xl font-bold">
          <a href="#">MyLogo</a>
        </div>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-gray-400">
            Home
          </a>
          <a href="#about" className="hover:text-gray-400">
            About
          </a>
          <a href="#services" className="hover:text-gray-400">
            Services
          </a>
          <a href="#contact" className="hover:text-gray-400">
            Contact
          </a>
        </nav>

        {/* Кнопка меню для мобильных */}
        <div className="md:hidden">
          <button
            className="text-gray-400 hover:text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12" // Иконка "крестик"
                    : "M4 6h16M4 12h16m-7 6h7" // Иконка "три полоски"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-700">
          <ul className="flex flex-col space-y-2 py-4 px-6">
            <li>
              <a href="#home" className="hover:text-gray-400 block">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-400 block">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-gray-400 block">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-400 block">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
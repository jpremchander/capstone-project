import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-2 shadow-sm' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            🤖
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NorthernAI
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {['Home', 'Products', 'About', 'Lab'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FiUser size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <FiShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {['Home', 'Products', 'About', 'Lab'].map((item) => (
              <a 
                key={item}
                href="#"
                className="py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex gap-4 pt-2">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2"
              >
                {darkMode ? <FiSun /> : <FiMoon />} Theme
              </button>
              <button className="flex items-center gap-2">
                <FiUser /> Account
              </button>
              <button className="flex items-center gap-2">
                <FiShoppingCart /> Cart (3)
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
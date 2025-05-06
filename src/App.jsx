import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
           (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Define icon components
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const PhoneIcon = getIcon('Phone');

  return (
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container-custom flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <BuildingIcon className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">Buildcon Constructions</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="flex items-center space-x-1 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </a>
            <a href="#projects" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Projects</a>
            <a href="#features" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Features</a>
            <a href="/contact" className="flex items-center space-x-1 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">
              <PhoneIcon className="h-5 w-5" />
              <span>Contact</span>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <SunIcon className="h-5 w-5 text-yellow-400" /> : 
                <MoonIcon className="h-5 w-5 text-surface-700" />
              }
            </motion.button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home toast={toast} />} />
          <Route path="/contact" element={<Contact toast={toast} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-surface-800 dark:bg-surface-900 text-white py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BuildingIcon className="h-6 w-6 text-primary-light" />
                <span className="text-lg font-bold">Buildcon Constructions</span>
              </div>
              <p className="text-surface-300 text-sm">
                Connecting construction professionals and property developers while streamlining project management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="/" className="hover:text-primary-light transition-colors">Home</a></li>
                <li><a href="#projects" className="hover:text-primary-light transition-colors">Projects</a></li>
                <li><a href="#features" className="hover:text-primary-light transition-colors">Features</a></li>
                <li><a href="/contact" className="hover:text-primary-light transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Contact</h4>
              <p className="text-surface-300 text-sm">
                123 Construction Ave<br />
                Building City, BC 10001<br />
                info@buildconconstructions.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-surface-700 text-center text-surface-400 text-sm">
            &copy; {new Date().getFullYear()} Buildcon Constructions. All rights reserved.
          </div>
        </div>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-lg shadow-lg"
      />
    </>
  );
}

export default App;
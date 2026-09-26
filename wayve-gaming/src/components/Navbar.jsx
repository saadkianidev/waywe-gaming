import { useEffect, useState } from 'react';
import Logo from './Logo';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Games', href: '/games' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

function ThemeToggleButton({ onToggleTheme, compact = false }) {
  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label="Toggle color theme"
      className={`theme-toggle rounded-lg flex items-center justify-center ${
        compact ? 'p-2' : 'p-2.5 w-11 h-11'
      }`}
    >
      <i className="fas fa-sun text-yellow-400 text-sm dark:hidden" />
      <i className="fas fa-moon text-white text-sm hidden dark:block" />
    </button>
  );
}

export default function Navbar({ onToggleTheme, currentPath = '/' }) {
  const [open, setOpen] = useState(false);

  // Close the mobile menu when resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" onClick={() => handleNavClick('/')}>
            <Logo />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`nav-link font-medium text-base ${
                    currentPath === link.href ||
                    (link.href === '/games' && currentPath.startsWith('/games/'))
                      ? 'text-primary is-active'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/contact"
              onClick={() => handleNavClick('#contact')}
              className="btn-secondary px-3 py-2"
            >
              Contact Us
            </a>
            <ThemeToggleButton onToggleTheme={onToggleTheme} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggleButton onToggleTheme={onToggleTheme} compact />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              <i className={`fas ${open ? 'fa-times' : 'fa-bars'} text-xl`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`block font-medium py-2 ${
                  currentPath === link.href ||
                  (link.href === '/games' && currentPath.startsWith('/games/'))
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
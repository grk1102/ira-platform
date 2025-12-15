import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-ira-helps', label: 'How Ira Helps' },
  { href: '/about', label: 'About' },
  { href: '/ethics-safety', label: 'Ethics & Safety' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="ira-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-serif text-2xl md:text-3xl text-foreground tracking-tight hover:opacity-80 transition-opacity"
          >
            Ira
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  location.pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/#talk-to-ira"
              className="ml-4 px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            >
              Talk to Ira
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="ira-container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-xl transition-colors ${
                    location.pathname === link.href
                      ? 'bg-ira-sage-light text-foreground font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/#talk-to-ira"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl text-center font-medium transition-all duration-200 hover:opacity-90"
                >
                  Talk to Ira
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

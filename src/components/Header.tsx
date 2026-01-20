import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dasGhLogo from '@/assets/das-gh-logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-800/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img 
              src={dasGhLogo} 
              alt="Das GH Ltd - Building Construction & Real Estate" 
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gold-100/80 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="mailto:dasghlimited@gmail.com"
              className="text-gold-100/70 hover:text-gold-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/233240384380"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="sm">
                <Phone className="w-4 h-4" />
                Get a Quote
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gold-100 p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-800/98 backdrop-blur-lg border-t border-gold-500/20"
          >
            <nav className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold-100/80 hover:text-gold-400 transition-colors text-lg font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://wa.me/233240384380"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button variant="gold" className="w-full">
                  <Phone className="w-4 h-4" />
                  Get a Quote
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

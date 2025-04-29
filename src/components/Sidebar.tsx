
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Briefcase, GraduationCap, Star, Link, Mail, Bitcoin } from 'lucide-react';
import { cn } from '@/lib/utils';
import CryptoWidget from './CryptoWidget';

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navigation: NavigationItem[] = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Academic', href: '#academic', icon: GraduationCap },
  { name: 'Personal', href: '#personal', icon: Star },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionId = section.getAttribute('id') || '';
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center p-2 rounded-full bg-crypto-darkBlue border border-crypto-purple/30 shadow-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className="text-crypto-purple" />
          ) : (
            <Menu size={24} className="text-crypto-purple" />
          )}
        </button>
      </div>

      {/* Sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-crypto-darkBlue border-l border-crypto-purple/20 shadow-xl z-40 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full py-6 px-4">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center">
              <Bitcoin size={24} className="text-crypto-purple mr-2" />
              <h2 className="text-xl font-bold text-white">Charandeep</h2>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-white/5"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={closeSidebar}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      activeSection === item.href.substring(1)
                        ? "bg-crypto-purple/20 text-crypto-purple"
                        : "text-gray-300 hover:bg-crypto-purple/10 hover:text-crypto-purple"
                    )}
                  >
                    <item.icon size={18} className="mr-3 flex-shrink-0" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-4 px-2 border-t border-white/10">
            <CryptoWidget />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

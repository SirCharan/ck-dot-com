import React, { useState, useEffect } from 'react';
import { Menu, X, User, FileText, Briefcase, GraduationCap, Star, Wrench, Mail, Bitcoin, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import CryptoWidget from './CryptoWidget';

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navigation: NavigationItem[] = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Writings', href: '/blog', icon: BookOpen },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Research Papers', href: '#research-papers', icon: FileText },
  { name: 'Academic', href: '#academic', icon: GraduationCap },
  { name: 'Tools', href: '#tools', icon: Wrench },
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

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center p-2 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-[var(--neon-purple)] transition-all group"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className="text-[var(--neon-purple)]" strokeWidth={2} />
          ) : (
            <Menu size={24} className="text-[var(--neon-purple)]" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Sidebar backdrop - glass overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeSidebar}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-64 z-40 transform transition-transform duration-300 ease-out',
          'bg-[var(--glass-bg)] backdrop-blur-2xl border-l border-[var(--glass-border)]',
          'shadow-[-10px_0_40px_rgba(0,0,0,0.3)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full py-6 px-4">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-2">
              <Bitcoin size={24} className="text-[var(--neon-purple)]" strokeWidth={2} />
              <h2 className="font-orbitron text-base font-bold uppercase tracking-wide text-white">
                Charandeep
              </h2>
            </div>
            <button
              onClick={closeSidebar}
              className="p-1 rounded hover:bg-white/5 transition-colors group"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-400 group-hover:text-[var(--neon-purple)] transition-colors" strokeWidth={2} />
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
                      'group flex items-center px-3 py-2.5 rounded transition-all duration-300',
                      'font-rajdhani font-semibold text-sm uppercase tracking-[0.15em]',
                      'relative overflow-hidden',
                      activeSection === item.href.substring(1)
                        ? 'text-[var(--neon-purple)] bg-[var(--neon-purple)]/10'
                        : 'text-gray-300 hover:text-white'
                    )}
                  >
                    {activeSection === item.href.substring(1) && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--neon-purple)] rounded-r" />
                    )}
                    <item.icon size={18} className="mr-3 flex-shrink-0" strokeWidth={2} />
                    <span
                      className={cn(
                        'inline-block border-b-2 border-transparent -mb-0.5 pb-0.5',
                        activeSection === item.href.substring(1)
                          ? 'border-[var(--neon-purple)] text-[var(--neon-purple)]'
                          : 'group-hover:border-[var(--neon-cyan)] group-hover:text-white'
                      )}
                    >
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-4 px-2 border-t border-[var(--glass-border)]">
            <CryptoWidget />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

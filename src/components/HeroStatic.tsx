import { Linkedin, Twitter, MessageCircle, Github } from 'lucide-react';

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/charandeep-kapoor/', icon: Linkedin, label: 'LinkedIn', hoverColor: 'cyan' },
  { href: 'https://x.com/yourasianquant', icon: Twitter, label: 'Twitter', hoverColor: 'cyan' },
  { href: 'https://t.me/ck_timekeeper', icon: MessageCircle, label: 'Telegram', hoverColor: 'cyan' },
  { href: 'https://github.com/SirCharan', icon: Github, label: 'GitHub', hoverColor: 'purple' },
] as const;

function SocialIcon({ href, icon: Icon, label, hoverColor }: typeof SOCIAL_LINKS[number]) {
  const colors = hoverColor === 'cyan'
    ? 'hover:text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
    : 'hover:text-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-lg cursor-pointer flex items-center justify-center transition-[color,background-color,transform,box-shadow] duration-300 text-gray-500 hover:scale-110 ${colors}`}
      aria-label={label}
    >
      <Icon className="w-5 h-5" strokeWidth={2} />
    </a>
  );
}

const HeroStatic = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      {/* Placeholder layers for interactive canvases — HeroInteractive will mount into these */}
      <div className="hero-aurora" />
      <div className="hero-scanlines" />

      <div className="relative z-10 flex flex-col min-h-screen p-6 md:p-12">
        <header
          className="flex justify-between items-center w-full mb-auto opacity-0"
          style={{
            animation: 'hero-fade-in-down 1s ease-out forwards',
            animationDelay: '0.5s',
            animationFillMode: 'forwards',
          }}
        >
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 border border-purple-500/50 flex items-center justify-center relative bg-black/20 backdrop-blur-sm group-hover:border-cyan-400 transition-colors duration-300">
              <span className="font-orbitron font-bold text-lg text-purple-400 group-hover:text-cyan-400 transition-colors">
                CK
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/30" />
            </div>
          </a>

          <nav className="hidden md:flex gap-12 font-rajdhani text-sm tracking-widest uppercase text-gray-300">
            <a href="#about" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">About</a>
            <a href="/blog" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">Writings</a>
            <a href="#research-papers" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">Research</a>
            <a href="#tools" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">Tools</a>
            <a href="#contact" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">Contact</a>
          </nav>

          <div className="md:hidden text-white">
            <button type="button" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center relative w-full">
          {/* Desktop left social icons */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 opacity-0"
            style={{
              animation: 'hero-slide-in-left 1s ease-out forwards',
              animationDelay: '1s',
              animationFillMode: 'forwards',
            }}
          >
            <div className="flex flex-col gap-2 text-gray-500">
              {SOCIAL_LINKS.map((link) => (
                <SocialIcon key={link.label} {...link} />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 w-full max-w-7xl mx-auto z-20">
            <div
              id="hero-card"
              className="hero-glass-card w-full max-w-2xl p-8 md:p-12 md:py-16 rounded-sm"
            >
              <div className="hero-hud-corner tl" aria-hidden />
              <div className="hero-hud-corner tr" aria-hidden />
              <div className="hero-hud-corner bl" aria-hidden />
              <div className="hero-hud-corner br" aria-hidden />

              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <h1 className="text-3xl md:text-4xl leading-tight text-center md:text-left">
                  <span className="hero-name-glitch block" data-text="Charandeep">
                    <span className="hero-name-text">Charandeep</span>
                  </span>
                  <span className="hero-name-glitch block" data-text="Kapoor">
                    <span className="hero-name-text">Kapoor</span>
                  </span>
                </h1>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-6" />

                <div className="relative font-rajdhani text-base md:text-xl text-gray-200 tracking-[0.2em] uppercase overflow-hidden">
                  <span className="invisible block" aria-hidden>
                    Building and scaling products 0→1
                  </span>
                  <span className="hero-subtitle-line1 absolute inset-x-0 top-0 text-center md:text-left">
                    Building and scaling products 0→1
                  </span>
                  <span className="hero-subtitle-line2 absolute inset-x-0 top-0 text-center md:text-left">
                    Crypto | AI | Stock Markets
                  </span>
                </div>

                <p className="font-sans text-gray-400 text-sm md:text-base max-w-lg mt-4 leading-relaxed tracking-wide">
                  6+ years of experience across product, research and VC in crypto & stock markets. Building and scaling products 0→1.
                </p>

                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex gap-4">
                    <a
                      href="https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-8 py-3 bg-purple-600/20 border border-purple-500 text-white font-orbitron text-xs tracking-widest uppercase hover:bg-purple-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-[color,background-color,border-color,box-shadow] duration-300 overflow-hidden inline-block"
                    >
                      <span className="relative z-10">Sensibull Showcase</span>
                      <div
                        className="hero-btn-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ transform: 'translateX(-100%) skewX(-15deg)' }}
                      />
                    </a>
                    <a
                      href="#contact"
                      className="px-8 py-3 border border-white/20 text-gray-300 font-orbitron text-xs tracking-widest uppercase hover:border-cyan-400 hover:text-cyan-400 transition-[color,border-color] duration-300 inline-block"
                    >
                      Contact
                    </a>
                  </div>
                  {/* Mobile social icons */}
                  <div className="flex gap-2 lg:hidden">
                    {SOCIAL_LINKS.map((link) => (
                      <SocialIcon key={`m-${link.label}`} {...link} />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-900/10 rounded-full blur-3xl -z-10"
                aria-hidden
              />
            </div>
          </div>
        </main>

        <footer
          className="mt-auto pt-6 border-t border-white/5 flex justify-between items-end opacity-0"
          style={{
            animation: 'hero-fade-in-up 1s ease-out forwards',
            animationDelay: '0.8s',
            animationFillMode: 'forwards',
          }}
        >
          <div className="hidden md:flex gap-1">
            <a href="#experience" className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-orbitron tracking-widest text-gray-400 hover:bg-purple-900/40 hover:border-purple-500 hover:text-white transition-[color,background-color,border-color]">
              Experience
            </a>
            <a href="#research-papers" className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-orbitron tracking-widest text-gray-400 hover:bg-purple-900/40 hover:border-purple-500 hover:text-white transition-[color,background-color,border-color]">
              Research
            </a>
            <a href="/blog" className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-orbitron tracking-widest text-gray-400 hover:bg-purple-900/40 hover:border-purple-500 hover:text-white transition-[color,background-color,border-color]">
              Writings
            </a>
            <a href="#tools" className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-orbitron tracking-widest text-gray-400 hover:bg-purple-900/40 hover:border-purple-500 hover:text-white transition-[color,background-color,border-color]">
              Open Source Tools
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HeroStatic;

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Linkedin, Twitter } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const SocialLink = ({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-4 rounded-lg border border-[var(--glass-border)] bg-transparent hover:border-[var(--neon-purple)] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 group"
  >
    <div className="w-12 h-12 rounded-full bg-[var(--neon-purple)]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--neon-purple)] transition-all duration-300">
      <Icon size={20} className="text-[var(--neon-purple)]" strokeWidth={2} />
    </div>
    <div className="ml-4">
      <h3 className="font-rajdhani text-sm uppercase tracking-widest text-gray-400">{label}</h3>
      <span className="text-white font-mono text-sm crypto-link">{value}</span>
    </div>
  </a>
);

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4">
            Get In Touch
          </h2>
          <p className="font-rajdhani text-lg md:text-2xl uppercase tracking-[0.2em] text-gray-200">
            <span className="text-[var(--neon-purple)]">|</span> Connect <span className="text-[var(--neon-cyan)]">|</span> Collaborate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="max-w-5xl mx-auto p-8 md:p-12">
            <p className="text-gray-300 mb-8 font-medium text-base md:text-lg">
              I&apos;m always open to discussing crypto projects, trading strategies, or potential collaborations. Feel free to reach out through any of the channels below:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-4">
                <SocialLink href="https://www.linkedin.com/in/charandeep-kapoor/" icon={Linkedin} label="LinkedIn" value="charandeep-kapoor" />
                <SocialLink href="https://x.com/yourasianquant" icon={Twitter} label="Twitter" value="@yourasianquant" />
                <SocialLink href="https://t.me/charandeep_kapoor" icon={MessageSquare} label="Telegram" value="@charandeep_kapoor" />
              </div>

              <div className="flex flex-col space-y-4">
                <a
                  href="https://calendly.com/charan-kapoor/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg border border-[var(--glass-border)] bg-transparent hover:border-[var(--neon-purple)] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 btn-shine group"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--neon-purple)]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--neon-purple)] transition-all duration-300">
                    <Mail size={20} className="text-[var(--neon-purple)]" strokeWidth={2} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-orbitron text-sm font-bold uppercase tracking-wider text-white">Book a Meeting</h3>
                    <p className="text-gray-400 text-sm font-mono">Schedule a call to discuss your project</p>
                  </div>
                </a>

                <div className="flex flex-col p-4 rounded-lg border border-[var(--glass-border)] bg-transparent">
                  <h3 className="font-rajdhani text-sm uppercase tracking-widest text-gray-400 mb-2">Quick Response</h3>
                  <p className="text-gray-400 text-sm font-mono">
                    I typically respond within 24 hours. For urgent matters, Telegram is the fastest way to reach me.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
            © {new Date().getFullYear()} Charandeep Kapoor. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

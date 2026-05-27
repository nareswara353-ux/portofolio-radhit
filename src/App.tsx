/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Github, Mail, Menu, X } from 'lucide-react';

const Typewriter = ({ words }: { words: string[] }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const i = loopNum % words.length;
    const fullText = words[i];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length - 1));
        }, 50);
      }
    } else {
      if (text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words]);

  return (
    <div className="inline-block">
      <span className="text-neon-accent font-semibold">{text}</span>
      <span className="text-neon-accent animate-pulse font-semibold ml-1">|</span>
    </div>
  );
};

const HERO_WORDS = ["Front End Developer", "Fullstack Developer", "Tech Enthusiast"];

const SectionReveal = ({ children, className = '', id = '' }: { children: ReactNode, className?: string, id?: string }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen flex flex-col justify-center pt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="bg-dark-bg text-white min-h-screen font-sans selection:bg-neon-accent selection:text-black">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark-bg/60 backdrop-blur-xl py-4 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#hero" className="text-2xl font-bold tracking-tight">
            Porto<span className="text-neon-accent">folio.</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-neon-accent transition-colors font-medium text-sm tracking-wide"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-dark-surface border-b border-gray-800 py-4 px-6 shadow-xl">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-400 hover:text-neon-accent transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <SectionReveal id="hero">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-neon-accent font-semibold mb-3 text-lg"
              >
                Halo, saya Radhitya Putra Nareswara
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter italic bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent"
              >
                Developer Web
              </motion.h1>
              
              <div className="text-3xl md:text-5xl mb-6 h-[60px]">
                <Typewriter words={HERO_WORDS} />
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed"
              >
                Saya membuat web yang Interaktif, dan responsif
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-10 mb-16"
              >
                <a href="#projects" className="inline-block border border-neon-accent text-neon-accent hover:bg-neon-accent hover:text-black px-8 py-3 rounded-full font-bold transition-all transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,156,0.3)] tracking-wide text-sm font-mono">
                  Lihat Proyek Saya
                </a>
              </motion.div>

              {/* Metrics / Stats Counter */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-gray-800"
              >
                {[
                  { value: '1', label: 'Project' },
                  { value: '100+', label: 'Jam Coding' },
                  { value: '10+', label: 'Teknologi' },
                  { value: '101%', label: 'Semangat' }
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">{stat.value}</span>
                    <span className="text-sm font-mono text-gray-500 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Decorative Code Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="bg-card-dark rounded-xl p-6 shadow-2xl border border-gray-800 font-mono text-sm relative">
                <div className="flex space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{'}</p>
                  <p className="ml-4"><span className="text-pink-400">name:</span> <span className="text-orange-300">'Radhitya Putra N.'</span>,</p>
                  <p className="ml-4"><span className="text-pink-400">role:</span> <span className="text-orange-300">'Full-Stack Dev'</span>,</p>
                  <p className="ml-4"><span className="text-pink-400">skills:</span> [<span className="text-orange-300">'React'</span>, <span className="text-orange-300">'TS'</span>, <span className="text-orange-300">'UI/UX'</span>],</p>
                  <p className="ml-4"><span className="text-pink-400">status:</span> <span className="text-orange-300">'Coding...'</span></p>
                  <p>{'};'}</p>
                  <p className="text-gray-500 mt-4">{'// Menjalankan inisialisasi...'}</p>
                  <p><span className="text-blue-400">developer</span>.<span className="text-yellow-200">startBuilding</span>();</p>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-neon-accent text-black px-4 py-2 rounded-lg font-bold shadow-xl rotate-3">
                  INTERACTIVE
                </div>
              </div>
            </motion.div>
          </div>
        </SectionReveal>

        {/* About Section */}
        <SectionReveal id="about" className="items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 italic tracking-tighter">
            Tentang <span className="text-neon-accent">Saya</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Saya tertarik pada dunia Coding khususnya pada Front-End Development, merancang UI/UX yang interaktif dan memberikan User Experience yang maximal. Merancang design yang minimalis namun modern.
          </p>
        </SectionReveal>

        {/* Projects Section */}
        <SectionReveal id="projects">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center italic tracking-tighter">
            Project <span className="text-neon-accent">Saya</span>
          </h2>
          
          <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
            {[
              {
                title: 'Dashboard Kos Kos an',
                desc: 'Dashboard Admin dan User responsif dengan berbagai fitur yang fungsional yang dibuat dengan Typescript, Tailwind, dan Vite.',
                tags: ['TypeScript', 'Tailwind CSS', 'Vite']
              }
            ].map((project, idx) => (
              <div 
                key={idx}
                className="bg-dark-surface p-8 rounded-2xl border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-neon-accent/5 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-neon-accent/10 transition-colors"></div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-accent transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-6 relative z-10">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-black text-gray-300 px-2 py-1 text-[10px] rounded font-mono uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Contact Section */}
        <SectionReveal id="contact" className="items-center text-center pb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 italic tracking-tighter">
            Let's <span className="text-neon-accent">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-12">
            Let's Build A Project With Me!
          </p>
          
          <div className="flex gap-6 justify-center">
            {[
              { 
                icon: Github, 
                label: 'GitHub', 
                action: () => window.open('https://github.com/nareswara353-ux', '_blank', 'noopener,noreferrer')
              },
              { 
                icon: Mail, 
                label: 'Email', 
                action: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nareswara353@gmail.com', '_blank', 'noopener,noreferrer') 
              }
            ].map((social, idx) => (
              <button
                key={idx}
                onClick={social.action}
                aria-label={social.label}
                className="w-14 h-14 rounded-full bg-dark-surface border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-neon-accent hover:border-neon-accent hover:text-black hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all duration-300 cursor-pointer"
              >
                <social.icon size={24} strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </SectionReveal>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-gray-800 text-xs font-mono uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Crafted with ❤️ by Radhitya.</p>
      </footer>
    </div>
  );
}

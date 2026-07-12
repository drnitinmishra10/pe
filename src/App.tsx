import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import SyllabusSection from './components/SyllabusSection';
import LecturesSection from './components/LecturesSection';
import BlogSection from './components/BlogSection';
import ShowcaseSection from './components/ShowcaseSection';
import FeedbackForm from './components/FeedbackForm';
import { Sparkles, Terminal, FileText, ArrowRight, Star } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('syllabus');
  const [selectedInquiryAssignment, setSelectedInquiryAssignment] = useState<string>('');

  // Auto scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleInquireAssignment = (assignmentTitle: string) => {
    setSelectedInquiryAssignment(assignmentTitle);
    setActiveTab('feedback');
  };

  const handleClearInitialAssignment = () => {
    setSelectedInquiryAssignment('');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#1A1A1A] font-sans sparkle-grid flex flex-col justify-between selection:bg-[#EC4899] selection:text-white">
      <div>
        {/* Main Header / Navigation */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Section Contents */}
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeTab === 'syllabus' && (
                <SyllabusSection onInquireAssignment={handleInquireAssignment} />
              )}
              {activeTab === 'lectures' && (
                <LecturesSection />
              )}
              {activeTab === 'blog' && (
                <BlogSection />
              )}
              {activeTab === 'showcase' && (
                <ShowcaseSection />
              )}
              {activeTab === 'feedback' && (
                <FeedbackForm 
                  initialAssignment={selectedInquiryAssignment}
                  onClearInitialAssignment={handleClearInitialAssignment}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Artistic Ticker Header */}
      <div className="h-12 bg-black border-t-2 border-b-2 border-black flex items-center overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex text-white">
          <span className="font-mono text-[10px] tracking-[0.2em] px-8">PROMPT ENGINEERING LABORATORY // DEPT OF COMPUTER SCIENCE // UNIVERSITY OF ADVANCED STUDIES // SEMESTER ENROLLMENT OPEN // REASONING-THROUGH-LANGUAGE //</span>
          <span className="text-[#EC4899] font-mono text-[10px] tracking-[0.2em] px-8 italic font-bold uppercase">Live Updates: Lecture 05 coming soon</span>
          <span className="font-mono text-[10px] tracking-[0.2em] px-8">PROMPT ENGINEERING LABORATORY // DEPT OF COMPUTER SCIENCE // UNIVERSITY OF ADVANCED STUDIES // SEMESTER ENROLLMENT OPEN // REASONING-THROUGH-LANGUAGE //</span>
          <span className="text-[#EC4899] font-mono text-[10px] tracking-[0.2em] px-8 italic font-bold uppercase">Live Updates: Lecture 05 coming soon</span>
        </div>
      </div>

      {/* Modern, academic footer - Stylized brutalist */}
      <footer className="bg-black text-slate-300 py-12 border-t-2 border-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 border-2 border-white bg-[#6366F1] flex items-center justify-center font-black text-sm text-white italic">
                  PE
                </div>
                <span className="font-display font-black text-white text-2xl tracking-tighter italic">CSE-402</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Advanced Prompt Engineering &amp; AI Alignment course website. Crafted for Dr. Nitin Mishra's research lab and academic catalog.
              </p>
            </div>
            
            <div>
              <h4 className="font-display font-black text-white text-xs uppercase tracking-widest mb-3">Resources</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#syllabus" onClick={(e) => { e.preventDefault(); setActiveTab('syllabus'); }} className="hover:text-[#EC4899] transition-colors font-semibold">Course Syllabus</a></li>
                <li><a href="#lectures" onClick={(e) => { e.preventDefault(); setActiveTab('lectures'); }} className="hover:text-[#84CC16] transition-colors font-semibold">Lecture Archive</a></li>
                <li><a href="#blog" onClick={(e) => { e.preventDefault(); setActiveTab('blog'); }} className="hover:text-[#6366F1] transition-colors font-semibold">Prompt Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-black text-white text-xs uppercase tracking-widest mb-3">Support</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#feedback" onClick={(e) => { e.preventDefault(); setActiveTab('feedback'); }} className="hover:text-[#EC4899] transition-colors font-semibold">Submit Ticket</a></li>
                <li><a href="#showcase" onClick={(e) => { e.preventDefault(); setActiveTab('showcase'); }} className="hover:text-[#84CC16] transition-colors font-semibold">Student Work</a></li>
                <li><span className="text-slate-500 font-mono">Build ID: PE-2026.F.1</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[10px] text-slate-500">
            <span>&copy; 2026 Dr. Nitin Mishra. All Rights Reserved.</span>
            <span className="flex items-center gap-1 justify-center text-[#84CC16]">
              Designed for GitHub Pages Deployment &amp; Interactive Learning <Star className="h-3 w-3 text-[#EC4899] fill-current" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

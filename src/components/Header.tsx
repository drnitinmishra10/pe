import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Terminal, Sparkles, BookOpen, Clock, MapPin } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: 'syllabus', label: 'Syllabus & Info', icon: BookOpen },
    { id: 'lectures', label: 'Lectures Index', icon: Terminal },
    { id: 'blog', label: 'Prompt Blog', icon: Sparkles },
    { id: 'showcase', label: 'Student Projects', icon: GraduationCap },
    { id: 'feedback', label: 'Support & Inquiries', icon: Clock },
  ];

  return (
    <header className="relative overflow-hidden border-b-4 border-black bg-[#F9F8F3]">
      {/* Decorative solid top band */}
      <div className="h-2 w-full bg-black" id="top-rainbow-strip" />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Brand/Identity */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-black text-[#84CC16] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0">
              <Terminal className="h-9 w-9 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#6366F1] block mb-1">
                  Professor of Applied AI &amp; Cognitive Architectures
                </span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tighter leading-none italic uppercase text-black">
                  Dr. Nitin Mishra
                </h1>
                <span className="inline-flex items-center border-2 border-black bg-[#84CC16] text-black px-2.5 py-0.5 text-xs font-black uppercase">
                  CSE-402
                </span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-black font-semibold">
                <span className="flex items-center gap-1 bg-[#FDE68A] border border-black px-2 py-0.5">
                  <Clock className="h-3.5 w-3.5" /> Mon &amp; Wed 2:00 PM - 4:00 PM
                </span>
                <span className="flex items-center gap-1 bg-[#EC4899]/15 border border-black px-2 py-0.5">
                  <MapPin className="h-3.5 w-3.5" /> Academic Hall, Lab 304
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats/Badges */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-[10px] font-mono text-black/50 uppercase font-black">Term</div>
              <div className="font-display font-black text-black text-sm uppercase">Fall Semester 2026</div>
            </div>
            <div className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-[10px] font-mono text-black/50 uppercase font-black">Credits</div>
              <div className="font-display font-black text-black text-sm uppercase">4.0 Credits (L-T-P: 3-0-2)</div>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mt-10">
          <nav className="flex flex-wrap gap-2 sm:gap-3" aria-label="Tabs" id="main-navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 border-2 border-black px-4 py-2.5 font-display text-xs sm:text-sm font-black uppercase tracking-tight transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(132,204,22,1)] translate-y-0.5'
                      : 'bg-white text-black hover:bg-[#EC4899] hover:text-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { syllabusData } from '../data';
import { SyllabusUnit } from '../types';
import { 
  Binary, Users, Layers, Brain, GitMerge, 
  ChevronDown, BookOpen, FileText, ArrowRight, 
  HelpCircle, Trophy, Award, Landmark 
} from 'lucide-react';

interface SyllabusSectionProps {
  onInquireAssignment: (assignmentTitle: string) => void;
}

export default function SyllabusSection({ onInquireAssignment }: SyllabusSectionProps) {
  const [expandedUnit, setExpandedUnit] = useState<string | null>("Unit 1");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary': return <Binary className="h-5 w-5" />;
      case 'Users': return <Users className="h-5 w-5" />;
      case 'Layers': return <Layers className="h-5 w-5" />;
      case 'Brain': return <Brain className="h-5 w-5" />;
      case 'GitMerge': return <GitMerge className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getUnitTheme = (unit: string) => {
    switch (unit) {
      case 'Unit 1': return { bg: 'bg-[#EC4899]/10 text-[#EC4899] border-[#EC4899]' };
      case 'Unit 2': return { bg: 'bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]' };
      case 'Unit 3': return { bg: 'bg-[#84CC16]/10 text-emerald-800 border-emerald-600' };
      case 'Unit 4': return { bg: 'bg-[#F59E0B]/10 text-amber-800 border-amber-600' };
      default: return { bg: 'bg-[#FDE68A]/40 text-[#F59E0B] border-[#F59E0B]' };
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 text-black">
      {/* Syllabus Week-by-Week Accordion */}
      <div className="lg:col-span-2 space-y-5">
        <div className="flex items-center gap-2.5 mb-6 border-b-2 border-black pb-2">
          <BookOpen className="h-6 w-6 text-black" />
          <h2 className="font-display text-3xl font-black uppercase tracking-tighter italic text-black">Interactive Syllabus</h2>
        </div>

        {syllabusData.map((unit) => {
          const isExpanded = expandedUnit === unit.unit;
          const theme = getUnitTheme(unit.unit);

          return (
            <div 
              key={unit.unit} 
              id={`syllabus-unit-${unit.unit.toLowerCase().replace(' ', '-')}`}
              className="overflow-hidden border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              {/* Accordion Trigger */}
              <button
                id={`syllabus-trigger-${unit.unit.toLowerCase().replace(' ', '-')}`}
                onClick={() => setExpandedUnit(isExpanded ? null : unit.unit)}
                className={`flex w-full items-center justify-between p-5 text-left transition-colors cursor-pointer ${
                  isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-11 w-11 items-center justify-center border-2 border-black bg-black text-[#84CC16] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                    {getIcon(unit.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-black uppercase tracking-wider ${theme.bg} px-2 py-0.5 border border-black`}>
                        {unit.unit}
                      </span>
                      <span className="text-xs text-black/50 font-bold uppercase">Core Track</span>
                    </div>
                    <h3 className="font-display text-xl font-black uppercase tracking-tight text-black mt-1">
                      {unit.title}
                    </h3>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-black transition-transform duration-300 stroke-[2.5] ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <div className="border-t-2 border-black bg-slate-50 p-6 space-y-6">
                      {/* Description */}
                      <div>
                        <h4 className="text-xs font-mono font-black text-black uppercase tracking-wider mb-2">Unit Objective</h4>
                        <p className="text-black/80 text-sm leading-relaxed font-medium">{unit.description}</p>
                      </div>

                      {/* Topics */}
                      <div>
                        <h4 className="text-xs font-mono font-black text-black uppercase tracking-wider mb-2">Weekly Lecture Focus</h4>
                        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                          {unit.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-black font-semibold bg-white p-2 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                              <span className="mt-1 h-2 w-2 bg-[#6366F1] border border-black shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Readings & Bibliography */}
                      <div>
                        <h4 className="text-xs font-mono font-black text-black uppercase tracking-wider mb-2">Required Academic Bibliography</h4>
                        <div className="space-y-2">
                          {unit.readings.map((reading, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-black/70 italic font-medium bg-[#EC4899]/5 border border-black/10 p-2">
                              <FileText className="h-4 w-4 text-[#EC4899] shrink-0" />
                              <span>{reading}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assignments */}
                      {unit.assignments.length > 0 && (
                        <div className="pt-4 border-t-2 border-dashed border-black/30">
                          <h4 className="text-xs font-mono font-black text-black uppercase tracking-wider mb-3">Unit Deliverables</h4>
                          {unit.assignments.map((assignment) => (
                            <div 
                              key={assignment.id} 
                              id={`deliverable-${assignment.id}`}
                              className="border-2 border-black bg-white p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] transition-all"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <Trophy className="h-4 w-4 text-[#F59E0B]" />
                                  <h5 className="font-display font-black uppercase text-black text-sm">{assignment.title}</h5>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="inline-flex items-center border border-black bg-[#FDE68A] px-2 py-0.5 text-xs font-black uppercase text-black">
                                    {assignment.points} Points
                                  </span>
                                  <span className="inline-flex items-center border border-black bg-[#EC4899] px-2 py-0.5 text-xs font-black uppercase text-white">
                                    Due {assignment.dueDate}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-black/70 mt-2 font-medium leading-relaxed">
                                {assignment.description}
                              </p>
                              
                              <div className="mt-3.5 flex justify-end">
                                <button
                                  id={`btn-ask-${assignment.id}`}
                                  onClick={() => onInquireAssignment(assignment.title)}
                                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-tight text-[#6366F1] hover:text-[#EC4899] transition-colors cursor-pointer"
                                >
                                  Inquire about assignment
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Course Info & Grading Breakdown */}
      <div className="space-y-6">
        <div className="border-2 border-black bg-[#FDE68A] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
          <div className="flex items-center gap-2 mb-4 border-b border-black pb-2">
            <Award className="h-5 w-5 text-black" />
            <h3 className="font-display font-black uppercase text-lg tracking-tight">Course Information</h3>
          </div>
          <p className="text-xs text-black/80 leading-relaxed font-semibold">
            Welcome to <strong>CSE-402: Advanced Prompt Engineering</strong>. This course focuses on building stable, reproducible software interfaces utilizing Large Language Models. Students will master token alignment, mathematical control, persona defense, and semantic structuring.
          </p>

          <div className="mt-6 space-y-3 font-mono text-xs font-bold">
            <div className="flex justify-between border-b border-black/10 pb-2">
              <span className="text-black/60">Classroom:</span>
              <span className="text-black">Academic Hall 304</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-2">
              <span className="text-black/60">Lab Slots:</span>
              <span className="text-black">Fridays 10:00 AM - 12:00 PM</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-2">
              <span className="text-black/60">Pre-requisite:</span>
              <span className="text-black">Python &amp; Probability</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-black/60">Office Hour:</span>
              <span className="text-black">Wed 4:00 PM - 5:30 PM (Lab 304)</span>
            </div>
          </div>
        </div>

        {/* Grading breakdown */}
        <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 mb-4 border-b border-black pb-2">
            <Landmark className="h-5 w-5 text-black" />
            <h3 className="font-display font-black uppercase text-lg tracking-tight">Grading Policy</h3>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-black uppercase mb-1.5">
                <span>Assignments &amp; Labs</span>
                <span className="text-[#6366F1]">40%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 border-2 border-black overflow-hidden">
                <div className="h-full bg-[#6366F1] border-r-2 border-black" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase mb-1.5">
                <span>Student Showcase Project</span>
                <span className="text-[#84CC16]">30%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 border-2 border-black overflow-hidden">
                <div className="h-full bg-[#84CC16] border-r-2 border-black" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase mb-1.5">
                <span>Mid-Term Exam</span>
                <span className="text-[#EC4899]">20%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 border-2 border-black overflow-hidden">
                <div className="h-full bg-[#EC4899] border-r-2 border-black" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase mb-1.5">
                <span>Classroom Engagement</span>
                <span className="text-[#F59E0B]">10%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 border-2 border-black overflow-hidden">
                <div className="h-full bg-[#F59E0B] border-r-2 border-black" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

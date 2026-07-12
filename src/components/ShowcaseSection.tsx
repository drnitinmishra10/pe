import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { studentProjects } from '../data';
import { StudentProject } from '../types';
import { 
  GraduationCap, ThumbsUp, Copy, Check, Terminal, 
  User, Award, Eye, Code, Layers 
} from 'lucide-react';

export default function ShowcaseSection() {
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>({});
  const [activeProject, setActiveProject] = useState<StudentProject | null>(null);

  useEffect(() => {
    // Load vote states from localStorage
    const storedVotes = localStorage.getItem('professor_site_votes');
    if (storedVotes) {
      setVotedIds(JSON.parse(storedVotes));
    }

    // Load project data with persistent vote counts if stored
    const storedProjects = localStorage.getItem('professor_site_projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(studentProjects);
    }
  }, []);

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasVoted = votedIds[id];
    const updatedVotes = { ...votedIds, [id]: !hasVoted };
    setVotedIds(updatedVotes);
    localStorage.setItem('professor_site_votes', JSON.stringify(updatedVotes));

    const updatedProjects = projects.map(proj => {
      if (proj.id === id) {
        return {
          ...proj,
          votes: hasVoted ? proj.votes - 1 : proj.votes + 1
        };
      }
      return proj;
    });

    setProjects(updatedProjects);
    localStorage.setItem('professor_site_projects', JSON.stringify(updatedProjects));
  };

  const handleCopyPrompt = (id: string, promptText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 text-black">
      {/* Showcase header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-black" />
          <h2 className="font-display text-3xl font-black uppercase tracking-tighter italic text-black">Student Showcase Gallery</h2>
        </div>
      </div>

      <p className="text-sm text-black/80 max-w-2xl leading-relaxed font-semibold">
        Behold the premier prompts and in-context frameworks crafted by CSE-402 students. Inspect the structural design patterns, review execution logs, and cast your votes.
      </p>

      {/* Grid of Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => {
          const isVoted = votedIds[project.id];
          const isExpanded = activeProject?.id === project.id;
          const shadowColor = [
            'shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:shadow-[6px_6px_0px_0px_rgba(236,72,153,1)]',
            'shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,1)]',
            'shadow-[4px_4px_0px_0px_rgba(132,204,22,1)] hover:shadow-[6px_6px_0px_0px_rgba(132,204,22,1)]',
          ][idx % 3];

          return (
            <div
              key={project.id}
              id={`project-showcase-${project.id}`}
              className={`border-2 border-black bg-white p-6 transition-all duration-150 hover:-translate-y-1 flex flex-col justify-between ${shadowColor} ${isExpanded ? 'lg:col-span-2' : ''}`}
            >
              <div>
                {/* Heading / Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-black/60 font-mono font-bold uppercase">
                    <Award className="h-3.5 w-3.5 text-[#F59E0B]" />
                    <span>Selected Lab Highlight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="inline-flex items-center border border-black bg-slate-100 px-2 py-0.5 text-[9px] font-black uppercase font-mono text-black">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-black mt-3 leading-snug">
                  {project.title}
                </h3>

                {/* Creator credits */}
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-black font-black uppercase tracking-tight">
                  <User className="h-3.5 w-3.5 text-[#6366F1]" />
                  <span>Developer(s): <span className="bg-[#EC4899]/10 px-1.5 py-0.5 border border-black/10">{project.studentNames.join(' & ')}</span></span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs text-black/70 leading-relaxed font-semibold">
                  {project.description}
                </p>

                {/* Expanded Playground Sandbox */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 space-y-4 pt-4 border-t-2 border-dashed border-black/30 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Prompt Solution */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-tight text-black flex items-center gap-1">
                              <Code className="h-3.5 w-3.5 text-[#EC4899]" /> Systems Instruction Prompt
                            </span>
                            <button
                              id={`btn-copy-${project.id}`}
                              onClick={(e) => handleCopyPrompt(project.id, project.promptSolution, e)}
                              className="border border-black bg-[#FDE68A] text-black px-2.5 py-1 text-xs font-black uppercase tracking-tight hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-1"
                            >
                              {copiedId === project.id ? (
                                <span className="text-emerald-700 font-black flex items-center gap-1"><Check className="h-3 w-3" /> Copied!</span>
                              ) : (
                                <span className="flex items-center gap-1"><Copy className="h-3 w-3" /> Copy Prompt</span>
                              )}
                            </button>
                          </div>
                          <pre className="bg-black text-[#84CC16] p-4 border-2 border-black font-mono text-xs overflow-x-auto h-64 leading-relaxed whitespace-pre-wrap select-all shadow-inner rounded-none">
                            <code>{project.promptSolution}</code>
                          </pre>
                        </div>

                        {/* Interactive Execution Log */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-tight text-black flex items-center gap-1">
                              <Terminal className="h-3.5 w-3.5 text-[#6366F1]" /> Simulated LLM Output log
                            </span>
                          </div>
                          <div className="bg-black text-slate-300 p-4 border-2 border-black font-mono text-xs overflow-x-auto h-64 leading-relaxed whitespace-pre-wrap select-text shadow-inner rounded-none">
                            {project.outputPreview}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                <button
                  id={`btn-expand-${project.id}`}
                  onClick={() => setActiveProject(isExpanded ? null : project)}
                  className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-3.5 py-2 text-xs font-black uppercase text-black hover:bg-[#FDE68A] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Eye className="h-3.5 w-3.5 text-black" />
                  {isExpanded ? 'Hide Prompt Blueprint' : 'Inspect Prompt blueprint'}
                </button>

                <div className="flex items-center gap-4">
                  {/* Upvote triggers */}
                  <button
                    id={`btn-vote-${project.id}`}
                    onClick={(e) => handleVote(project.id, e)}
                    className={`flex items-center gap-1.5 border-2 border-black px-3.5 py-2 text-xs font-black uppercase tracking-tight transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      isVoted 
                        ? 'bg-[#6366F1] text-white' 
                        : 'bg-white text-black hover:bg-[#EC4899] hover:text-white'
                    }`}
                  >
                    <ThumbsUp className={`h-3.5 w-3.5 ${isVoted ? 'fill-current text-white' : ''}`} />
                    <span>{project.votes} {isVoted ? 'Voted' : 'Upvote'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lecture } from '../types';
import { 
  Terminal, Search, BookOpen, Clock, 
  ExternalLink, ChevronRight, RefreshCw, X, 
  Monitor, Smartphone, ArrowLeft, ArrowUpRight
} from 'lucide-react';

export default function LecturesSection() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  const fetchIndex = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/lectures/index.json');
      if (!response.ok) {
        throw new Error(`Failed to load lecture index (Status ${response.status})`);
      }
      const data: Lecture[] = await response.json();
      setLectures(data);
    } catch (err: any) {
      console.error(err);
      setError('Could not retrieve the automatically indexed lectures. Please refresh or verify the public/lectures/ directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndex();
  }, []);

  const filteredLectures = lectures.filter(lecture => 
    lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecture.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-black" />
          <h2 className="font-display text-3xl font-black uppercase tracking-tighter italic text-black">Lecture Archive</h2>
        </div>

        {/* Refresh button */}
        <button
          id="btn-reindex-lectures"
          onClick={fetchIndex}
          className="flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-black ${loading ? 'animate-spin' : ''}`} />
          Re-scan Folder
        </button>
      </div>

      <p className="text-sm text-black/80 max-w-2xl leading-relaxed font-semibold">
        The archive below automatically crawling, parsing, and indexing HTML slides located inside the course folder. Lecture titles are harvested directly from each slide's <code>&lt;title&gt;</code> tag at build-time.
      </p>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-black" />
        </div>
        <input
          id="search-lectures"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search indexed lectures or topics..."
          className="block w-full border-2 border-black bg-white py-2.5 pl-10 pr-4 text-sm text-black font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#84CC16]/10"
        />
      </div>

      {/* Loading States */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="h-9 w-9 animate-spin border-4 border-black border-t-transparent" />
          <p className="font-mono text-xs text-black font-bold uppercase tracking-wider">Parsing HTML headers and building indices...</p>
        </div>
      ) : error ? (
        <div className="border-2 border-black bg-[#FCA5A5] p-6 text-center max-w-xl mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-sm font-black text-black uppercase">{error}</p>
          <p className="text-xs text-black/80 mt-2 font-medium">
            Tip: Run the Vite dev server or verify that public/lectures/ has .html files.
          </p>
          <button
            onClick={fetchIndex}
            className="mt-4 inline-flex items-center gap-1 border-2 border-black bg-black px-4 py-2 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(132,204,22,1)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Retry Verification
          </button>
        </div>
      ) : filteredLectures.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-black bg-white">
          <p className="text-black/60 text-sm font-black uppercase">No indexed lectures match your search query.</p>
        </div>
      ) : (
        /* Grid of Lectures */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLectures.map((lecture, idx) => {
            // Give each card a distinct background vibe based on index
            const bgStyle = [
              'bg-[#EC4899]/10 hover:bg-[#EC4899]/20 shadow-[3px_3px_0px_0px_rgba(236,72,153,1)]',
              'bg-[#6366F1]/10 hover:bg-[#6366F1]/20 shadow-[3px_3px_0px_0px_rgba(99,102,241,1)]',
              'bg-[#84CC16]/10 hover:bg-[#84CC16]/20 shadow-[3px_3px_0px_0px_rgba(132,204,22,1)]',
              'bg-[#FDE68A]/30 hover:bg-[#FDE68A]/50 shadow-[3px_3px_0px_0px_rgba(253,230,138,1)]',
            ][idx % 4];

            const textStyle = [
              'text-[#EC4899]',
              'text-[#6366F1]',
              'text-emerald-700',
              'text-amber-800',
            ][idx % 4];

            return (
              <motion.div
                key={lecture.fileName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className={`group relative overflow-hidden border-2 border-black ${bgStyle} p-6 hover:-translate-y-1 transition-all duration-150 cursor-pointer flex flex-col justify-between`}
                onClick={() => setActiveLecture(lecture)}
                id={`lecture-card-${lecture.fileName.replace('.html', '')}`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="font-mono text-[10px] font-black text-black/50 uppercase tracking-wider">
                      Unit 0{idx + 1} &bull; SLIDES
                    </span>
                    <BookOpen className={`h-4.5 w-4.5 ${textStyle}`} />
                  </div>
                  <h3 className="font-display font-black uppercase text-black text-lg mt-4 leading-snug tracking-tight">
                    {lecture.title}
                  </h3>
                  <p className="mt-2 text-xs font-mono text-black/50 bg-white/60 border border-black/5 px-2 py-0.5 inline-block rounded-none truncate max-w-full">
                    {lecture.fileName}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-3">
                  <span className="text-[10px] text-black font-black uppercase">Dr. Nitin Mishra</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-black uppercase tracking-tight ${textStyle}`}>
                    Open Lecture <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Immersive Lecture Reader Room (Modal) */}
      <AnimatePresence>
        {activeLecture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95"
            id="lecture-reader-modal"
          >
            {/* Top Bar Controls */}
            <div className="flex items-center justify-between bg-[#F9F8F3] px-6 py-4 border-b-4 border-black text-black">
              <div className="flex items-center gap-4">
                <button
                  id="btn-close-reader"
                  onClick={() => setActiveLecture(null)}
                  className="border-2 border-black bg-white p-2 text-black hover:bg-[#EC4899] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
                </button>
                <div>
                  <span className="text-[10px] font-mono font-black text-[#6366F1] tracking-widest uppercase">
                    Dr. Mishra Lecture Portal
                  </span>
                  <h3 className="font-display font-black text-black uppercase text-lg truncate max-w-md sm:max-w-xl">
                    {activeLecture.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Viewport toggle for testing responsiveness */}
                <div className="hidden sm:flex border-2 border-black bg-white p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`p-1 cursor-pointer ${
                      viewportMode === 'desktop' ? 'bg-black text-white' : 'text-black hover:bg-slate-100'
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`p-1 cursor-pointer ${
                      viewportMode === 'mobile' ? 'bg-black text-white' : 'text-black hover:bg-slate-100'
                    }`}
                    title="Mobile Preview"
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>

                {/* Open in new tab link */}
                <a
                  href={activeLecture.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black bg-[#84CC16] px-3.5 py-1.5 text-xs font-black uppercase text-black hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  New Tab <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </a>

                <button
                  onClick={() => setActiveLecture(null)}
                  className="border-2 border-black bg-white p-2 text-black hover:bg-[#EC4899] hover:text-white cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <X className="h-5 w-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Main Iframe Viewer Container */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-center bg-black/40">
              <motion.div
                layout
                className={`h-full w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(132,204,22,1)] overflow-hidden transition-all duration-200 ${
                  viewportMode === 'mobile' ? 'max-w-md border-x-8 border-black' : 'max-w-7xl'
                }`}
              >
                <iframe
                  id="lecture-iframe"
                  src={activeLecture.path}
                  title={activeLecture.title}
                  className="h-full w-full border-0"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

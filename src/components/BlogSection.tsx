import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts } from '../data';
import { BlogPost } from '../types';
import { 
  Sparkles, Calendar, User, Clock, ChevronRight, 
  ArrowLeft, Tag, BookMarked, MessageSquare, Heart 
} from 'lucide-react';

export default function BlogSection() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Gather all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  );

  const filteredPosts = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 text-black">
      {/* Blog view header */}
      <AnimatePresence mode="wait">
        {!activePost ? (
          /* Blog Grid View */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-[#EC4899]" />
                <h2 className="font-display text-3xl font-black uppercase tracking-tighter italic text-black">Dr. Nitin Mishra's Prompt Blog</h2>
              </div>
            </div>

            <p className="text-sm text-black/80 max-w-2xl leading-relaxed font-semibold">
              Academic essays, hyperparameter tutorials, and engineering findings on how attention boundaries shape large model behavior.
            </p>

            {/* Tags Ribbon */}
            <div className="flex flex-wrap gap-2.5 pb-4">
              <button
                onClick={() => setSelectedTag(null)}
                className={`border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                  !selectedTag 
                    ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]' 
                    : 'bg-white text-black hover:bg-[#EC4899] hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                All Topics
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-1 ${
                    selectedTag === tag 
                      ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]' 
                      : 'bg-white text-black hover:bg-[#EC4899] hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <Tag className="h-3 w-3 opacity-90" />
                  {tag}
                </button>
              ))}
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => {
                const isLiked = likedPosts[post.id];
                return (
                  <article
                    key={post.id}
                    id={`blog-card-${post.id}`}
                    onClick={() => setActivePost(post)}
                    className="group flex flex-col justify-between border-2 border-black bg-white p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(236,72,153,1)] hover:border-black transition-all cursor-pointer"
                  >
                    <div>
                      {/* Meta information */}
                      <div className="flex items-center justify-between text-[10px] font-black uppercase font-mono tracking-wider border-b border-black/10 pb-2">
                        <span className="text-[#EC4899] border border-[#EC4899]/30 bg-[#EC4899]/5 px-2 py-0.5">{post.category}</span>
                        <div className="flex items-center gap-3 text-black/50">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-black" /> {post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-black" /> {post.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl font-black uppercase tracking-tight text-black mt-4 leading-snug">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-3 text-xs text-black/70 leading-relaxed font-semibold line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 border-2 border-black bg-[#6366F1] text-white flex items-center justify-center font-black text-xs italic">
                          NM
                        </div>
                        <span className="text-xs text-black font-bold uppercase tracking-tight">{post.author}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Like button */}
                        <button
                          onClick={(e) => toggleLike(post.id, e)}
                          className={`border-2 border-black bg-white p-1.5 cursor-pointer hover:bg-black hover:text-white transition-colors ${
                            isLiked ? 'text-[#EC4899] bg-[#EC4899]/5' : 'text-black'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-[#EC4899]' : ''}`} />
                        </button>
                        <span className="text-xs font-black uppercase tracking-tight text-[#6366F1] flex items-center gap-0.5">
                          Read Post <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Immersive Blog Detail View */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-4 border-black p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Back to Blog Button */}
            <button
              id="btn-back-to-blog"
              onClick={() => setActivePost(null)}
              className="mb-8 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              Back to all posts
            </button>

            {/* Post Header */}
            <header className="mb-8 pb-8 border-b-2 border-black">
              <span className="text-xs font-mono font-black text-white bg-black uppercase tracking-widest border-2 border-black px-2.5 py-1">
                {activePost.category}
              </span>
              <h1 className="font-display text-3xl font-black uppercase tracking-tighter italic leading-none text-black mt-4 sm:text-5xl">
                {activePost.title}
              </h1>

              {/* Meta credits */}
              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-black font-bold uppercase tracking-tight">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 border-2 border-black bg-[#6366F1] text-white flex items-center justify-center font-black text-xs italic">
                    NM
                  </div>
                  <span className="text-black font-black">{activePost.author}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs bg-[#FDE68A] border border-black px-2.5 py-1"><Calendar className="h-4 w-4 text-black" /> {activePost.date}</div>
                <div className="flex items-center gap-1 font-mono text-xs bg-slate-100 border border-black px-2.5 py-1"><Clock className="h-4 w-4 text-black" /> {activePost.readTime}</div>
              </div>
            </header>

            {/* Post Content with gorgeous spacing & styles */}
            <div className="prose prose-indigo max-w-none space-y-6 text-black leading-relaxed font-semibold">
              {activePost.content.split('\n\n').map((paragraph, index) => {
                // Formatting helper for custom code-blocks or lists
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="font-display text-2xl font-black uppercase tracking-tight text-black mt-8 mb-4 border-l-4 border-[#EC4899] pl-3">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                
                if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2.5 text-black my-4">
                      {items.map((item, subIdx) => {
                        const cleanItem = item.replace(/^-\s+|^[0-9]+\.\s+/, '');
                        // Check for bold terms
                        if (cleanItem.includes('**')) {
                          const parts = cleanItem.split('**');
                          return (
                            <li key={subIdx} className="bg-white border border-black/10 p-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] max-w-2xl list-none flex items-start gap-2">
                              <span className="h-2 w-2 bg-[#6366F1] border border-black shrink-0 mt-1.5" />
                              <span><strong>{parts[1]}</strong>{parts[2]}</span>
                            </li>
                          );
                        }
                        return <li key={subIdx} className="bg-white border border-black/10 p-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] max-w-2xl list-none flex items-start gap-2">
                          <span className="h-2 w-2 bg-[#6366F1] border border-black shrink-0 mt-1.5" />
                          <span>{cleanItem}</span>
                        </li>;
                      })}
                    </ul>
                  );
                }

                if (paragraph.startsWith('```xml') || paragraph.startsWith('```text')) {
                  const cleanedCode = paragraph
                    .replace('```xml', '')
                    .replace('```text', '')
                    .replace('```', '')
                    .trim();
                  return (
                    <pre key={index} className="bg-black text-[#84CC16] p-5 border-2 border-black font-mono text-xs overflow-x-auto leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
                      <code>{cleanedCode}</code>
                    </pre>
                  );
                }

                if (paragraph.startsWith('|')) {
                  // Format as a beautiful table
                  const rows = paragraph.split('\n').filter(r => r.trim() !== '');
                  return (
                    <div key={index} className="overflow-x-auto my-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <table className="min-w-full divide-y-2 divide-black">
                        <tbody className="divide-y divide-black bg-white">
                          {rows.map((row, rIdx) => {
                            const cols = row.split('|').filter((_, cIdx) => cIdx > 0 && cIdx < row.split('|').length - 1);
                            const isHeader = rIdx === 0;
                            const isSeparator = row.includes('---');
                            if (isSeparator) return null;
                            return (
                              <tr key={rIdx} className={isHeader ? 'bg-black text-white font-black' : 'hover:bg-[#FDE68A]/20'}>
                                {cols.map((col, cIdx) => (
                                  <td 
                                    key={cIdx} 
                                    className={`px-4 py-3 text-xs border-r border-black/10 last:border-0 ${isHeader ? 'font-black uppercase text-white font-display' : 'text-black font-semibold'} ${col.includes('`') ? 'font-mono text-[#EC4899] font-black' : ''}`}
                                  >
                                    {col.replace(/`/g, '').trim()}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // Normal paragraph formatting with inline markdown support
                let formattedText: React.ReactNode = paragraph;
                if (paragraph.includes('**') || paragraph.includes('*') || paragraph.includes('`')) {
                  // Simple regex-like formatting parser for inline styling
                  const parts = paragraph.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/);
                  formattedText = parts.map((part, pIdx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={pIdx} className="text-black font-black">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                      return <em key={pIdx} className="italic text-black/70">{part.slice(1, -1)}</em>;
                    }
                    if (part.startsWith('`') && part.endsWith('`')) {
                      return <code key={pIdx} className="bg-black text-[#84CC16] px-1.5 py-0.5 font-mono text-xs border border-black/10">{part.slice(1, -1)}</code>;
                    }
                    return part;
                  });
                }

                return (
                  <p key={index} className="text-sm leading-relaxed text-black/90 my-4">
                    {formattedText}
                  </p>
                );
              })}
            </div>

            {/* Post footer credits & tags */}
            <div className="mt-12 pt-8 border-t-2 border-black flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {activePost.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 border border-black bg-white px-3 py-1 text-xs font-black uppercase text-black font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    <Tag className="h-3 w-3 text-[#EC4899]" />
                    {tag}
                  </span>
                ))}
              </div>

              <button
                id="btn-return-blog-bottom"
                onClick={() => setActivePost(null)}
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5]" /> Back to posts
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

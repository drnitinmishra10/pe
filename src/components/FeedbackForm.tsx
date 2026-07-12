import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { syllabusData } from '../data';
import { FeedbackInquiry } from '../types';
import { 
  Send, CheckCircle, BookMarked, MessageSquare, Clock, 
  HelpCircle, Sparkles, Inbox, RefreshCw, AlertCircle 
} from 'lucide-react';

interface FeedbackFormProps {
  initialAssignment?: string;
  onClearInitialAssignment: () => void;
}

export default function FeedbackForm({ initialAssignment, onClearInitialAssignment }: FeedbackFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<'assignment' | 'lecture' | 'general' | 'project'>('assignment');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [message, setMessage] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<FeedbackInquiry | null>(null);
  const [ticketsList, setTicketsList] = useState<FeedbackInquiry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gather all unique assignments from syllabus
  const allAssignments = syllabusData.flatMap(unit => unit.assignments);

  useEffect(() => {
    // If we have an initial assignment pre-filled from the syllabus section
    if (initialAssignment) {
      setInquiryType('assignment');
      setSelectedAssignment(initialAssignment);
    }
  }, [initialAssignment]);

  useEffect(() => {
    // Load existing tickets from localStorage
    const storedTickets = localStorage.getItem('professor_site_tickets');
    if (storedTickets) {
      setTicketsList(JSON.parse(storedTickets));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketId = `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInquiry: FeedbackInquiry = {
        id: ticketId,
        name,
        email,
        inquiryType,
        assignmentName: inquiryType === 'assignment' ? selectedAssignment : undefined,
        message,
        timestamp: new Date().toLocaleString(),
        status: 'pending'
      };

      const updatedTickets = [newInquiry, ...ticketsList];
      setTicketsList(updatedTickets);
      localStorage.setItem('professor_site_tickets', JSON.stringify(updatedTickets));
      setSubmittedInquiry(newInquiry);
      
      // Clear current form
      setName('');
      setEmail('');
      setMessage('');
      setSelectedAssignment('');
      onClearInitialAssignment();
      
      setIsSubmitting(false);
    }, 800); // Small fluid simulation of network transmission
  };

  const handleResetReceipt = () => {
    setSubmittedInquiry(null);
  };

  const handleDeleteTicket = (id: string) => {
    const updated = ticketsList.filter(t => t.id !== id);
    setTicketsList(updated);
    localStorage.setItem('professor_site_tickets', JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 text-black">
      {/* Feedback Form / Receipt Overlay */}
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          {!submittedInquiry ? (
            /* The Active Feedback Form */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-4 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-2 mb-6 border-b-2 border-black pb-3">
                <MessageSquare className="h-5 w-5 text-black" />
                <h3 className="font-display font-black text-black text-xl uppercase tracking-tight italic">Submit Assignment Inquiry</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" id="assignment-inquiry-form">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Student Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="student-name" className="text-xs font-black uppercase tracking-wider text-black">
                      Full Name
                    </label>
                    <input
                      id="student-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="block w-full border-2 border-black bg-white px-3.5 py-2.5 text-xs font-semibold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FDE68A]/20 transition-all"
                    />
                  </div>

                  {/* Student Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="student-email" className="text-xs font-black uppercase tracking-wider text-black">
                      Academic Email
                    </label>
                    <input
                      id="student-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jdoe@university.edu"
                      className="block w-full border-2 border-black bg-white px-3.5 py-2.5 text-xs font-semibold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FDE68A]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Inquiry Category */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="inquiry-category" className="text-xs font-black uppercase tracking-wider text-black">
                      Inquiry Category
                    </label>
                    <select
                      id="inquiry-category"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as any)}
                      className="block w-full border-2 border-black bg-white px-3.5 py-2.5 text-xs font-semibold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none cursor-pointer"
                    >
                      <option value="assignment">Assignment Support</option>
                      <option value="lecture">Lecture Question</option>
                      <option value="project">Showcase Collaboration</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>

                  {/* Dynamic Assignment Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="assignment-selector" className="text-xs font-black uppercase tracking-wider text-black">
                      Target Syllabus Deliverable
                    </label>
                    <select
                      id="assignment-selector"
                      required={inquiryType === 'assignment'}
                      disabled={inquiryType !== 'assignment'}
                      value={selectedAssignment}
                      onChange={(e) => setSelectedAssignment(e.target.value)}
                      className="block w-full border-2 border-black bg-white px-3.5 py-2.5 text-xs font-semibold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none disabled:bg-slate-100 disabled:text-black/40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <option value="">-- Choose Assignment --</option>
                      {allAssignments.map(asm => (
                        <option key={asm.id} value={asm.title}>{asm.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Question/Message Details */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-message" className="text-xs font-black uppercase tracking-wider text-black">
                    Question Blueprint / Inquiry Details
                  </label>
                  <textarea
                    id="inquiry-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide a clear description of your question or issue, including what steps you have attempted so far..."
                    className="block w-full border-2 border-black bg-white px-3.5 py-2.5 text-xs font-semibold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FDE68A]/20 transition-all"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <button
                    id="btn-submit-inquiry"
                    type="submit"
                    disabled={isSubmitting}
                    className="border-2 border-black bg-black text-white px-5 py-3 text-xs font-black uppercase tracking-tight shadow-[3px_3px_0px_0px_rgba(236,72,153,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Transmitting Ticket...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4 stroke-[2.5]" />
                        Submit Assignment Inquiry
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Digital Inquiry Receipt Display */
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border-4 border-black bg-[#84CC16]/5 p-6 sm:p-10 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              id="ticket-receipt"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center border-2 border-black bg-[#84CC16] text-white">
                <CheckCircle className="h-6 w-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-black text-2xl uppercase tracking-tighter italic mt-4">
                Inquiry Logged Successfully!
              </h3>
              <p className="text-xs text-black/70 mt-1 font-semibold">
                Your ticket has been catalogued in Dr. Mishra's queue ledger.
              </p>

              {/* Receipt details */}
              <div className="my-6 border-2 border-black bg-white p-5 text-left font-mono text-xs text-black space-y-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="text-black/50 font-bold uppercase">Ticket ID:</span>
                  <span className="font-black text-black">{submittedInquiry.id}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="text-black/50 font-bold uppercase">Student Name:</span>
                  <span className="font-black text-black">{submittedInquiry.name}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="text-black/50 font-bold uppercase">Category:</span>
                  <span className="font-black text-black capitalize">{submittedInquiry.inquiryType}</span>
                </div>
                {submittedInquiry.assignmentName && (
                  <div className="flex justify-between border-b border-black/10 pb-2">
                    <span className="text-black/50 font-bold uppercase">Assignment:</span>
                    <span className="font-black text-black truncate max-w-xs">{submittedInquiry.assignmentName}</span>
                  </div>
                )}
                <div className="flex justify-between pb-1">
                  <span className="text-black/50 font-bold uppercase">Est. Response:</span>
                  <span className="font-black text-[#6366F1] flex items-center gap-1 bg-[#6366F1]/10 border border-[#6366F1]/20 px-2 py-0.5">
                    <Clock className="h-3 w-3" /> Under 24 Hours
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  id="btn-new-inquiry"
                  onClick={handleResetReceipt}
                  className="border-2 border-black bg-black text-white px-4 py-2.5 text-xs font-black uppercase tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submitted Tickets Queue Sidebar */}
      <div className="space-y-6">
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
            <Inbox className="h-5 w-5 text-black animate-pulse" />
            <h3 className="font-display font-black text-black text-base uppercase tracking-tight">Active Tickets ({ticketsList.length})</h3>
          </div>

          {ticketsList.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-black bg-slate-50/50">
              <Inbox className="h-8 w-8 text-black/40 mx-auto stroke-1.5 mb-2 animate-bounce" />
              <p className="text-xs text-black/70 font-semibold leading-relaxed max-w-[200px] mx-auto">
                No tickets filed in this session. Use the form to submit one!
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {ticketsList.map((ticket) => (
                <div 
                  key={ticket.id} 
                  id={`ticket-card-${ticket.id}`}
                  className="border-2 border-black bg-[#F9F8F3] p-4 text-xs relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <button
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="absolute top-2.5 right-2.5 border border-black bg-white hover:bg-black hover:text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-tight cursor-pointer transition-colors"
                    title="Remove ticket"
                  >
                    Cancel
                  </button>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] font-black text-black/50">
                    <span className="text-black">{ticket.id}</span>
                    <span>&bull;</span>
                    <span>{ticket.timestamp}</span>
                  </div>
                  <h4 className="font-black text-black mt-2 capitalize text-xs">
                    {ticket.inquiryType} inquiry
                  </h4>
                  {ticket.assignmentName && (
                    <p className="text-[10px] font-mono text-[#6366F1] font-black truncate mt-0.5">
                      Asm: {ticket.assignmentName}
                    </p>
                  )}
                  <p className="text-black/80 mt-2 line-clamp-2 leading-relaxed font-semibold">
                    {ticket.message}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-2">
                    <span className="inline-flex items-center gap-1 text-[9px] font-black text-[#F59E0B] uppercase font-mono bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-1.5 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-ping" />
                      Pending Queue
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support instructions */}
        <div className="border-2 border-black bg-[#FDE68A]/30 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 mb-3 border-b border-black/10 pb-1.5">
            <AlertCircle className="h-4 w-4 text-black" />
            <h3 className="font-display font-black text-black text-xs uppercase tracking-tight">Escalation Policy</h3>
          </div>
          <p className="text-[11px] text-black/80 leading-relaxed font-semibold">
            Inquiries submitted via this portal are dispatched directly to Dr. Nitin Mishra's research assistants. Under extreme circumstances requiring direct faculty intervention, tickets are escalated immediately. Please consult lab logs before filing code requests.
          </p>
        </div>
      </div>
    </div>
  );
}

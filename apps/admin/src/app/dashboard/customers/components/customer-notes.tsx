'use client';

import { useState } from 'react';
import { CustomerNoteItem } from '@axa/types';
import { apiClient } from '@/lib/api-client';
import { formatDate } from '@axa/utils';
import { FileText, Send, Trash2, Loader2, UserCheck } from 'lucide-react';

interface CustomerNotesProps {
  customerId: string;
  notes: CustomerNoteItem[];
  refetch: () => void;
}

export function CustomerNotes({ customerId, notes = [], refetch }: CustomerNotesProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await apiClient(`/v1/customers/${customerId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ content })
      });
      if (res.success) {
        setContent('');
        refetch();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await apiClient(`/v1/customers/${customerId}/notes/${noteId}`, {
        method: 'DELETE'
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <FileText className="h-4 w-4 text-purple-400" />
        <h3 className="text-xs font-semibold text-white">Administrator Internal Notes</h3>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleAddNote} className="flex gap-2">
        <input
          type="text"
          placeholder="Add an internal administrator note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 disabled:opacity-40"
        >
          {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          <span>Add Note</span>
        </button>
      </form>

      {/* Notes Feed */}
      {notes.length === 0 ? (
        <p className="text-xs text-neutral-500 italic py-2">No internal notes added for this customer yet.</p>
      ) : (
        <div className="space-y-2.5 pt-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className="group flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs transition hover:border-white/20"
            >
              <div className="space-y-1 flex-1">
                <p className="text-white leading-relaxed">{note.content}</p>
                <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1 text-purple-300">
                    <UserCheck className="h-3 w-3" /> {note.createdBy}
                  </span>
                  <span>•</span>
                  <span>{formatDate(note.createdAt)}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                title="Delete note"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

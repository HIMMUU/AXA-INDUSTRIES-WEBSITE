'use client';

import { useState } from 'react';
import { EnquiryNoteItem } from '@axa/types';
import { formatDate } from '@axa/utils';
import { apiClient } from '@/lib/api-client';
import { StickyNote, Plus, Trash2 } from 'lucide-react';

export function EnquiryNotes({
  enquiryId,
  notes,
  refetch
}: {
  enquiryId: string;
  notes: EnquiryNoteItem[];
  refetch: () => void;
}) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      await apiClient(`/v1/enquiries/${enquiryId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ content })
      });
      setContent('');
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Delete this internal note?')) return;
    try {
      await apiClient(`/v1/enquiries/${enquiryId}/notes/${noteId}`, {
        method: 'DELETE'
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <StickyNote className="h-4 w-4 text-amber-400" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">SECTION 5</span>
          <h3 className="text-base font-bold text-white">Internal Administrator Notes</h3>
        </div>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleAddNote} className="space-y-2">
        <textarea
          rows={2}
          placeholder="Add an internal note or client update..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 hover:bg-amber-400 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" /> Add Note
          </button>
        </div>
      </form>

      {/* Notes List */}
      <div className="space-y-2.5 max-h-60 overflow-y-auto pt-2">
        {notes.length === 0 ? (
          <p className="text-xs text-neutral-500 text-center py-4">No internal notes added yet.</p>
        ) : (
          notes.map((n) => (
            <div key={n.id} className="group relative rounded-2xl border border-white/5 bg-white/5 p-3 text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-white/5 pb-1">
                <span className="font-semibold text-amber-400">{n.createdBy}</span>
                <span>{formatDate(n.createdAt)}</span>
              </div>
              <p className="text-neutral-200 leading-relaxed pt-1">{n.content}</p>
              <button
                onClick={() => handleDeleteNote(n.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

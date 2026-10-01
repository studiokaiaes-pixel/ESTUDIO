'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCoursesStore, Topic } from '@/lib/coursesStore';

export function QuickIndex({ currentSlug, topics: propTopics }: { currentSlug: string; topics?: Topic[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { courses } = useCoursesStore();

  const currentCourse = courses.find((c) => c.slug === currentSlug);
  const topics = propTopics || currentCourse?.topics || [];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 bg-white/90 backdrop-blur-md border border-black/10 rounded-2xl shadow-2xl overflow-hidden w-[280px] md:w-[320px]"
          >
            <div className="p-4 border-b border-black/5 flex justify-between items-center bg-black/5">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Índice Rápido</span>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                <X size={14} />
              </button>
            </div>
            <nav className="p-2 max-h-[60vh] overflow-y-auto">
              {topics.map((section) => (
                <Link
                  key={section.id}
                  href={`/ensenanzas/${currentSlug}/${section.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm hover:bg-black/5 rounded-xl transition-colors font-medium text-black/70 hover:text-black uppercase"
                >
                  {section.title}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-black/5">
                <Link
                  href={`/ensenanzas/${currentSlug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm hover:bg-black/5 rounded-xl transition-colors font-bold text-blue-600"
                >
                  Volver al Índice General
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all group"
      >
        <List size={18} className="group-hover:rotate-12 transition-transform" />
        <span className="text-xs uppercase tracking-[0.2em] font-bold">Explorar Temas</span>
      </button>
    </div>
  );
}

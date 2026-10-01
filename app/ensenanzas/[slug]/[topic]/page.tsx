'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { QuickIndex } from '@/components/quick-index';
import { useCoursesStore } from '@/lib/coursesStore';
import { CourseTopicPreview } from '@/components/CourseTopicPreview';

export default function TopicDynamicPage({
  params,
}: {
  params: Promise<{ slug: string; topic: string }>;
}) {
  const resolvedParams = use(params);
  const courseSlug = resolvedParams.slug.toLowerCase();
  const topicSlug = resolvedParams.topic.toLowerCase();

  const { courses } = useCoursesStore();
  const course = courses.find((c) => c.slug === courseSlug);
  const topicIndex = course?.topics.findIndex((t) => t.slug === topicSlug) ?? -1;
  const topic = topicIndex >= 0 && course ? course.topics[topicIndex] : null;

  const nextTopic =
    course && topicIndex >= 0 && topicIndex < course.topics.length - 1
      ? course.topics[topicIndex + 1]
      : null;

  if (!course || !topic) {
    return (
      <main className="min-h-screen bg-[#f5f4f3] text-black flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold uppercase">Tema no encontrado</h1>
          <p className="text-gray-600 text-sm">El contenido de esta lección no fue localizado.</p>
          <Link
            href={`/ensenanzas/${courseSlug}`}
            className="inline-block px-4 py-2 bg-black text-white rounded-xl text-xs font-bold uppercase"
          >
            Volver al Índice
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-black overflow-hidden selection:bg-[#a3e635]/30 font-sans">
      {/* Minimal Back Button */}
      <div className="fixed top-6 left-4 md:left-8 z-[60]">
        <Link
          href={`/ensenanzas/${course.slug}`}
          className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Volver al Índice</span>
        </Link>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="80px" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" height="80px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 md:pt-12 scroll-smooth">
          <div className="mt-6 md:mt-10 grid content-start justify-items-center gap-4 md:gap-6 text-center text-black">
            <span className="relative max-w-[25ch] text-[10px] md:text-xs uppercase leading-tight opacity-40 font-semibold tracking-wider">
              {topic.subtitle || `${topic.title.toUpperCase()} - ${course.title}`}
            </span>
          </div>

          <div className="mt-6 md:mt-10 w-full max-w-3xl px-4 md:px-12 pb-40">
            <CourseTopicPreview
              title={topic.title}
              subtitle={topic.subtitle}
              blocks={topic.blocks}
              currentSlug={course.slug}
            />

            {/* Next Topic Button */}
            {nextTopic && (
              <div className="pt-12 flex justify-end">
                <Link
                  href={`/ensenanzas/${course.slug}/${nextTopic.slug}`}
                  className="group flex items-center gap-2 px-4 py-2 border border-black/10 text-black/40 hover:text-black hover:border-black/20 transition-all text-[10px] uppercase tracking-[0.2em] font-bold"
                >
                  <span>Siguiente Tema ({nextTopic.title})</span>
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickIndex currentSlug={course.slug} topics={course.topics} />
    </main>
  );
}

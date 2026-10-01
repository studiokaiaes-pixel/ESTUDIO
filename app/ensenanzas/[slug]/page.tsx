'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronRight, Play } from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { useCoursesStore } from '@/lib/coursesStore';

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();

  const { courses } = useCoursesStore();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <main className="min-h-screen bg-[#f5f4f3] text-black flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold uppercase">Curso no encontrado</h1>
          <p className="text-gray-600 text-sm">No pudimos encontrar el contenido solicitado.</p>
          <Link href="/" className="inline-block px-4 py-2 bg-black text-white rounded-xl text-xs font-bold uppercase">
            Volver al Inicio
          </Link>
        </div>
      </main>
    );
  }

  const firstTopic = course.topics[0];

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-black overflow-hidden selection:bg-[#a3e635]/30 font-sans">
      {/* Minimal Back Button */}
      <div className="fixed top-6 left-4 md:left-8 z-[60]">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Inicio</span>
        </Link>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="80px" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" height="80px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 md:pt-12 scroll-smooth">
          <div className="mt-6 md:mt-10 grid content-start justify-items-center gap-4 md:gap-6 text-center text-black">
            <span className="relative max-w-[25ch] text-[10px] md:text-xs uppercase leading-tight opacity-40 font-semibold tracking-wider">
              {course.subtitle || `ENSEÑANZA BÍBLICA DE ${course.title}`}
            </span>
          </div>

          <div className="mt-6 md:mt-10 w-full max-w-3xl px-4 md:px-12 pb-40">
            <article className="space-y-8 md:space-y-12 pb-20">
              <div className="text-center space-y-2">
                <h1 className="text-xl md:text-2xl font-bold text-black tracking-widest uppercase">
                  Enseñanza Bíblica
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tighter uppercase">
                  {course.title}
                </h2>
              </div>

              <div className="max-w-xl mx-auto space-y-8 text-black">
                {course.description && (
                  <p className="text-sm md:text-base leading-relaxed text-black/70 italic border-l-2 border-black/10 pl-6 py-2 text-justify">
                    {course.description}
                  </p>
                )}

                {/* Dynamic Topics List */}
                {course.topics.length > 0 && (
                  <div className="space-y-6 pt-4">
                    {course.topics.map((topic) => (
                      <section key={topic.id} className="space-y-2">
                        <Link href={`/ensenanzas/${course.slug}/${topic.slug}`} className="group block">
                          <h3 className="font-bold text-lg md:text-xl uppercase tracking-wider group-hover:text-blue-600 transition-colors flex items-center gap-2">
                            {topic.title}
                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                        </Link>
                      </section>
                    ))}
                  </div>
                )}
              </div>

              {/* Start Lesson Button */}
              {firstTopic && (
                <div className="pt-12 flex justify-end">
                  <Link
                    href={`/ensenanzas/${course.slug}/${firstTopic.slug}`}
                    className="group flex items-center gap-2 px-4 py-2 border border-black/10 text-black/40 hover:text-black hover:border-black/20 transition-all text-[10px] uppercase tracking-[0.2em] font-bold"
                  >
                    <span>Iniciar Lección</span>
                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )}

              {/* Material de Apoyo Section */}
              {course.resources && course.resources.length > 0 && (
                <div className="mt-20 pt-10 border-t border-black/5 space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/30 text-center">
                    Material de Apoyo
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.resources.map((res) => (
                      <a
                        key={res.id}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-2xl bg-black/[0.02] border border-black/5 hover:bg-black/[0.05] transition-all group"
                      >
                        <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                          <Image
                            src={res.imageUrl || 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=200&h=120&fit=crop'}
                            alt={res.title}
                            fill
                            className="object-cover opacity-60 group-hover:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center">
                              <Play size={10} fill="black" className="ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute bottom-1 right-1 bg-red-600 text-[7px] font-bold px-1 rounded-sm text-white">
                            PDF
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-black group-hover:text-[#a3e635] transition-colors uppercase tracking-tight">
                            {res.title}
                          </span>
                          <span className="text-[9px] text-black/40 font-mono uppercase tracking-widest">{res.type}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}

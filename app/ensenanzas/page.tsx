"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Play, Info } from 'lucide-react';
import { CourseCard } from '@/components/CourseCard';
import { useCoursesStore } from '@/lib/coursesStore';

export default function EnsenanzasPage() {
  const { courses } = useCoursesStore();

  const disponibles = courses.filter((c) => c.category === 'disponible');
  const proximamente = courses.filter((c) => c.category === 'proximamente');

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#a3e635] selection:text-black pb-24 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full py-4 px-4 md:px-8 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <Link href="/" className="relative z-50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group cursor-pointer">
          <Home size={24} className="group-hover:scale-110 transition-transform" />
          <span className="hidden md:block font-medium text-sm">Inicio</span>
        </Link>
        <div className="text-xl font-bold tracking-tighter uppercase">
          MATERIAL DE <span className="text-[#a3e635]">ESTUDIO</span>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-start px-4 md:px-12 lg:px-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[#f97316] opacity-20" />

        {/* Right Image */}
        <div className="absolute right-[-20%] md:right-[5%] lg:right-[10%] bottom-0 w-[120%] md:w-[60%] lg:w-[45%] h-[80%] md:h-[95%] flex justify-end items-end pointer-events-none opacity-80 md:opacity-100">
          <div className="relative w-full h-full">
            <Image
              src="https://lh3.googleusercontent.com/d/15ESWllXvWWNaUEUphfCgcaQYSFXnc9BB"
              alt="Avatar de Estudio"
              fill
              className="object-cover object-top"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)'
              }}
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent" />

        <div className="relative z-10 max-w-2xl flex flex-col gap-4 mt-20 h-[416.25px]">
          <div className="text-[#a3e635] font-mono text-sm tracking-widest uppercase font-bold">
            NUEVO LANZAMIENTO
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none uppercase h-[135px]">
            MATERIAL DE<br />ESTUDIO
          </h1>
          <p className="text-[15px] text-justify leading-[21.375px] text-gray-300 mt-4 w-[444px] h-[138.25px] max-w-none">
            Este espacio reúne reflexiones, anotaciones y aprendizajes que forman parte de mi caminar con Dios. No desde una posición de enseñanza, sino como un registro del proceso y un retorno constante a la Biblia.
          </p>
        </div>
      </div>

      {/* Categories Rows */}
      <div className="flex flex-col gap-10 md:gap-16 px-4 md:px-12 lg:px-20 -mt-8 md:-mt-12 relative z-20">

        {/* Row 1: Cursos Disponibles */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-bold text-white/90 px-2 uppercase tracking-tight">Cursos Disponibles</h2>
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {disponibles.map((course) => (
              <CourseCard
                key={course.id}
                className="w-[200px] md:w-[280px] shrink-0 snap-start"
                title={course.title}
                author=""
                type={course.type}
                imageSrc={course.imageSrc}
                bgColor="bg-transparent"
                textColor="text-white"
                status={course.status}
              />
            ))}
          </div>
        </section>

        {/* Row 2: Próximamente */}
        {proximamente.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-white/90 px-2 uppercase tracking-tight">Próximamente</h2>
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {proximamente.map((course) => (
                <CourseCard
                  key={course.id}
                  className="w-[200px] md:w-[280px] shrink-0 snap-start"
                  title={course.title}
                  author=""
                  type={course.type}
                  imageSrc={course.imageSrc}
                  bgColor="bg-transparent"
                  textColor="text-white"
                  status={course.status}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

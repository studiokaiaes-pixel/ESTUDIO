"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, ArrowUpRight, Lock } from 'lucide-react';
import { ProfileModal } from '@/components/ProfileModal';
import { YearCountdown } from '@/components/YearCountdown';
import { FAQ } from '@/components/FAQ';
import { CourseCard } from '@/components/CourseCard';
import { useCoursesStore } from '@/lib/coursesStore';

export default function Page() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { courses } = useCoursesStore();

  return (
    <main className="min-h-screen relative overflow-hidden pb-20 font-sans">
      {/* Background Glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#0f3826]/50 blur-[140px] rounded-full pointer-events-none -z-20" />

      <div className="max-w-[1100px] mx-auto px-6 pt-8">

        {/* Top Navigation */}
        <nav className="flex items-center justify-between gap-2 mb-8 md:mb-24">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-full border border-white/10 bg-[#0a0a0a] text-[10px] md:text-sm text-gray-200 hover:bg-white/5 transition-all shrink-0"
            >
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#22c55e] flex items-center justify-center text-black">
                <User size={10} className="md:hidden" strokeWidth={3} />
                <User size={14} className="hidden md:block" strokeWidth={3} />
              </div>
              <span className="hidden sm:inline">Mi Perfil</span>
              <span className="sm:hidden">Perfil</span>
            </button>

            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-[#0a0a0a] text-[10px] md:text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all shrink-0"
              title="Panel de Administración"
            >
              <Lock size={12} className="text-[#22c55e]" />
              <span className="hidden sm:inline font-mono">Admin</span>
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <YearCountdown />
          </div>

          <div className="w-9 h-9 md:w-11 md:h-11 invisible shrink-0" />
        </nav>

        {/* Hero Section */}
        <div className="relative w-full flex flex-col md:flex-row justify-between items-center mt-4 md:mt-10 mb-16 md:mb-24 md:min-h-[700px]">

          {/* Left Text */}
          <div className="relative z-20 w-full md:w-1/3 flex flex-col items-center text-center md:pl-4 mb-8 md:mb-0 h-[137px]">
            <div className="w-12 md:w-16 h-[2px] bg-[#22c55e] mb-4 md:mb-5 opacity-80" />
            <h2 className="w-[370px] h-[165px] text-[28px] font-bold text-center leading-[1.15] text-gray-100 tracking-tight">
              Aprendiendo a vivir la Palabra de Dios,<br />un día a la vez
            </h2>
          </div>

          {/* Center Avatar Container */}
          <div className="relative w-full md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[-60px] flex flex-col items-center z-10">
            <div className="relative w-[280px] h-[380px] sm:w-[450px] sm:h-[600px] md:w-[700px] md:h-[850px] pointer-events-none">
              <Image
                src="https://lh3.googleusercontent.com/d/15ESWllXvWWNaUEUphfCgcaQYSFXnc9BB"
                alt="Avatar de Estudio"
                fill
                className="object-cover object-top"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 95%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 95%)'
                }}
                priority
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute bottom-[5%] md:bottom-[0%] left-1/2 -translate-x-1/2 text-center z-20 w-full flex flex-col items-center select-none pointer-events-none">
              <span className="text-[#4ade80] tracking-[0.6em] md:tracking-[1em] text-[8px] md:text-[14px] font-bold uppercase mb-[-5px] md:mb-[-20px] ml-2 md:ml-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></span>
              <h1 className="text-[50px] sm:text-[120px] md:text-[220px] font-[family-name:var(--font-montserrat)] font-bold tracking-[-0.06em] leading-none uppercase bg-gradient-to-b from-[#ffffff] via-[#e5e5e5] to-[#737373] bg-clip-text text-transparent drop-shadow-2xl">

              </h1>
            </div>
          </div>

          {/* Right Text */}
          <div className="relative z-20 w-full md:w-1/3 flex justify-center md:justify-end text-center md:pr-4 mt-8 md:mt-0">
            <p className="text-[#d4d4d8] text-[14px] text-center leading-[18.4px] ml-[-4px] w-[400px] max-w-full font-light">
              No lo sé todo, estoy aprendiendo. Aquí comparto lo que voy entendiendo de la Biblia a lo largo del camino. Si esto te ayuda de alguna forma, ya valió la pena.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-12 md:mb-16" />

        {/* About Section */}
        <div className="max-w-[900px] mb-12 md:mb-20">
          <h2 className="text-[26px] sm:text-3xl md:text-[40px] font-medium text-white mb-4 md:mb-6 leading-[1.2] tracking-tight">
            Creciendo en la fe, paso a paso
          </h2>
          <p className="text-white text-[14px] leading-[18.8px] max-w-[1000px]">
            Este espacio es solo un lugar donde guardo y comparto lo que estoy aprendiendo con Dios. Nada perfecto, solo real. Mi intención es simplemente crecer con Dios y, si es posible, ayudar a alguien en el camino.
          </p>
        </div>

        {/* Material de estudio Section */}
        <div id="ensenanzas" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-10 gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-5xl font-medium text-white tracking-tight uppercase">MATERIAL DE ESTUDIO</h2>
              <p className="text-[#a1a1aa] text-base md:text-lg">Mi proceso con la Palabra</p>
              <Link href="/ensenanzas" className="text-[#a3e635] text-sm md:text-base hover:underline flex items-center gap-1 mt-2">
                Ver todo el material <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="flex gap-4 text-[12px] md:text-sm text-gray-400 font-medium">
              <span className="text-[#a3e635]">Todos</span>
              <span className="hidden sm:inline opacity-50">—</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer transition-colors">Cursos</span>
              <span className="hidden sm:inline opacity-50">—</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer transition-colors">Libros</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courses.slice(0, 4).map((course) => (
              <CourseCard
                key={course.id}
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
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer / Contact */}
        <div className="flex flex-col items-center justify-center text-center pb-10">
          <h3 className="text-lg md:text-xl font-medium text-white mb-6 md:mb-8">Contáctame</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <SocialIcon type="instagram" label="Instagram" href="https://www.instagram.com/soykaue_/" />
            <SocialIcon type="x" label="X" href="https://x.com/soykaue_" />
            <SocialIcon type="church" label="Mi Iglesia" href="https://admmadureira.netlify.app" />
          </div>
        </div>

      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </main>
  );
}

function SocialIcon({ type, label, href = "#" }: { type: string, label: string, href?: string }) {
  const getIcon = () => {
    switch (type) {
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="2"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C"/>
          </svg>
        );
      case 'x':
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.41 12.915L1.254 2.25H8.08L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.083 4.126H5.117L17.083 19.77Z" fill="#FFFFFF"/>
          </svg>
        );
      case 'church':
        return (
          <div className="relative w-6 h-6 rounded-full overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/d/1EAego3HN68v7oLwB7FHEiBPtHybElBAo"
              alt="Logo Iglesia"
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
      <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center group-hover:bg-white/5 transition-colors">
        {getIcon()}
      </div>
      <span className="text-[10px] text-gray-500 font-medium tracking-wider group-hover:text-gray-300 transition-colors">{label}</span>
    </a>
  );
}

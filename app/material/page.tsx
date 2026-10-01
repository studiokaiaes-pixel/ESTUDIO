"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Play, Info, Download, Paperclip, ArrowUp, Image as ImageIcon, Figma, Upload, Layout, UserPlus, Plus } from 'lucide-react';
import { CourseCard } from '@/components/CourseCard';
import { Testimonial } from '@/components/ui/design-testimonial';

export default function MaterialPage() {
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const currentQuery = query;
    // Limpiamos el input inmediatamente para dar sensación de rapidez (Optimistic UI)
    setQuery('');
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData();
    formData.append("respuesta", currentQuery);

    try {
      const scriptUrl = "https://script.google.com/macros/s/AKfycbxViJmvEkvPTADhwF0DMNekYIT6AArwMypRlq0zEL06eWZGqCNl16cQOlEuRhA1IBEAMw/exec";

      // Usamos mode: 'no-cors' para evitar bloqueos de CORS y hacer que la petición no espere la redirección completa
      await fetch(scriptUrl, {
        method: "POST",
        body: formData,
        mode: 'no-cors'
      });

      // Al usar no-cors la respuesta es opaca (no podemos leer el JSON),
      // pero si no lanza excepción de red, asumimos que se envió correctamente.
      setSubmitStatus({ type: 'success', message: '¡Gracias por tu respuesta!' });

      // Ocultamos el mensaje de éxito después de 4 segundos para limpiar la interfaz
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 4000);

    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Error de conexión. Inténtalo de nuevo.' });
      setQuery(currentQuery); // Restauramos el texto si hubo un error real de red
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#a3e635] selection:text-black pb-24 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full py-4 px-4 md:px-8 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <Link href="/" className="relative z-50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group cursor-pointer">
          <Home size={24} className="group-hover:scale-110 transition-transform" />
          <span className="hidden md:block font-medium text-sm">Inicio</span>
        </Link>
        <div className="text-xl font-bold tracking-tighter uppercase">
          MATE<span className="text-[#a3e635]">RIAL</span>
        </div>
      </header>

      {/* Hero Section Replaced with Testimonial */}
      <Testimonial />

      {/* Categories Rows */}
      <div className="flex flex-col gap-10 md:gap-16 px-4 md:px-12 lg:px-20 mt-12 md:mt-16 relative z-20">

        {/* Search Section (v0 style) */}
        <section className="flex flex-col items-center w-full max-w-4xl mx-auto mb-4 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight text-white">¿Qué material necesitas hoy?</h2>

          <form onSubmit={handleSubmit} className="w-full bg-[#121212] border border-white/10 rounded-2xl p-3 flex flex-col gap-3 focus-within:border-white/20 transition-colors shadow-2xl">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe aquí tu opinión o lo que necesitas..."
              className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none resize-none min-h-[60px] p-2 text-lg"
              rows={1}
              required
            />
            <div className="flex items-center justify-end mt-2">
              <button
                type="submit"
                disabled={isSubmitting || !query.trim()}
                className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowUp size={20} />
                )}
              </button>
            </div>
          </form>

          {/* Status Message */}
          {submitStatus.message && (
            <div className={`mt-4 text-sm font-medium ${submitStatus.type === 'success' ? 'text-[#a3e635]' : 'text-red-400'}`}>
              {submitStatus.message}
            </div>
          )}
        </section>

        {/* Row 1: Plantillas Figma */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-bold text-white/90 px-2">Plantillas Figma</h2>
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <CourseCard
              className="w-[240px] md:w-[280px] snap-start"
              title="Dashboard SaaS"
              author="Por UI Team"
              type="PLANTILLA FIGMA"
              bgColor="bg-[#3b82f6]"
              textColor="text-white"
              hrefPrefix="/material"
            />
            <CourseCard
              className="w-[240px] md:w-[280px] snap-start"
              title="E-commerce App"
              author="Por John Doe"
              type="PLANTILLA FIGMA"
              bgColor="bg-[#8b5cf6]"
              textColor="text-white"
              hrefPrefix="/material"
            />
            <CourseCard
              className="w-[240px] md:w-[280px] snap-start"
              title="Landing Page Kit"
              author="Por Sarah Lee"
              type="PLANTILLA FIGMA"
              bgColor="bg-[#10b981]"
              textColor="text-white"
              hrefPrefix="/material"
            />
            <CourseCard
              className="w-[240px] md:w-[280px] snap-start"
              title="Portfolio Minimal"
              author=""
              type="PLANTILLA FIGMA"
              bgColor="bg-[#f97316]"
              textColor="text-white"
              hrefPrefix="/material"
            />
          </div>
        </section>

        {/* Row 2: Iconos y Assets */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-bold text-white/90 px-2">Iconos y Assets</h2>
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <CourseCard
              className="w-[240px] md:w-[280px] snap-start"
              title="Icon Pack 3D"
              author="Por Design Studio"
              type="ASSETS"
              bgColor="bg-[#e5e5e5]"
              textColor="text-black"
              hrefPrefix="/material"
            />
            <CourseCard
              className="w-[240px] md:w-[280px] snap-start"
              title="Ilustraciones Flat"
              author="Por Jane Smith"
              type="ASSETS"
              bgColor="bg-[#ec4899]"
              textColor="text-white"
              hrefPrefix="/material"
            />
            <CourseCard
              className="w-[240px] md:w-[280px] snap-start"
              title="Mockups iPhone 16"
              author="Por UI Team"
              type="MOCKUPS"
              bgColor="bg-[#64748b]"
              textColor="text-white"
              hrefPrefix="/material"
            />
          </div>
        </section>

      </div>
    </main>
  );
}

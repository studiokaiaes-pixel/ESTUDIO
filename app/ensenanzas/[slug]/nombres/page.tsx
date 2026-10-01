'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { QuickIndex } from '@/components/quick-index';

export default function NombresPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const isCristologia = resolvedParams.slug === 'cristologia';

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-black overflow-hidden selection:bg-[#a3e635]/30">
      {/* Minimal Back Button */}
      <div className="fixed top-6 left-4 md:left-8 z-[60]">
        <Link href={`/ensenanzas/${resolvedParams.slug}/encarnacion`} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Volver a Encarnación</span>
        </Link>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="80px" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" height="80px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 md:pt-12 scroll-smooth">
          <div className="mt-6 md:mt-10 grid content-start justify-items-center gap-4 md:gap-6 text-center text-black">
            <span className="relative max-w-[15ch] text-[10px] md:text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-5 md:after:h-6 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
              III. LOS NOMBRES DIVINOS DE CRISTO<br />{resolvedParams.slug.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 md:mt-10 w-full max-w-3xl px-4 md:px-12 pb-40">
            {isCristologia ? (
              <CristologiaNombres />
            ) : (
              <div className="text-center text-gray-500 mt-20">Contenido no encontrado.</div>
            )}
          </div>
        </div>
      </div>
      <QuickIndex currentSlug={resolvedParams.slug} />
    </main>
  );
}

function CristologiaNombres() {
  return (
    <article className="space-y-12 md:space-y-16 pb-20">
      <h1 className="text-3xl md:text-[60px] font-bold text-center mb-6 md:mb-12 text-black tracking-tighter leading-none uppercase">
        III. Los Nombres Divinos de Cristo
      </h1>

      <div className="space-y-10 text-black/80 text-sm md:text-base leading-relaxed">
        {/* Se le llama Dios */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Se le llama Dios</h2>
          <p>
            Este nombre muestra que Jesús es <span className="bg-yellow-200/80 px-1 rounded-sm">verdadero Dios, eterno y todopoderoso</span>. No se trata solamente de un título de honor, sino de una afirmación clara de su divinidad. Cristo posee la misma naturaleza divina y comparte plenamente la esencia de Dios.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Mas del Hijo dice: Tu trono, oh Dios, por el siglo del siglo; cetro de equidad es el cetro de tu reino.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Hebreos%201:8&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Hebreos 1:8 (Reina-Valera 1960)
              </a>
            </div>
          </div>
        </section>

        {/* Se le llama Señor */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Se le llama Señor</h2>
          <p>
            Este nombre significa que Jesús tiene <span className="bg-yellow-200/80 px-1 rounded-sm">autoridad sobre todo</span>. Él es quien gobierna y dirige la vida de sus seguidores. Llamarle Señor es reconocer su dominio, su poder y su autoridad soberana.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“...y toda lengua confiese que Jesucristo es el Señor, para gloria de Dios Padre.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Filipenses%202:11&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Filipenses 2:11 (Reina-Valera 1960)
              </a>
            </div>
          </div>
        </section>

        {/* Se le llama el Primero y el Último */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Se le llama el Primero y el Último</h2>
          <p>
            Este nombre indica que Cristo es el <span className="bg-yellow-200/80 px-1 rounded-sm">Creador y Dueño de todo, el principio y el fin de todas las cosas</span>. Él existe desde la eternidad y tiene autoridad sobre la historia, sobre la vida y sobre el destino final de la creación.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Yo soy el Alfa y la Omega, principio y fin, dice el Señor, el que es y que era y que ha de venir, el Todopoderoso.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Apocalipsis%201:8&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Apocalipsis 1:8 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Y cuando le vi, caí como muerto a sus pies. Y él puso su diestra sobre mí, diciéndome: No temas; yo soy el primero y el último.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Apocalipsis%201:17&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Apocalipsis 1:17 (Reina-Valera 1960)
              </a>
            </div>
          </div>
        </section>

        {/* Cristo, el Ungido de Jehová */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Cristo, el Ungido de Jehová</h2>
          <p>
            El nombre Cristo significa <span className="bg-yellow-200/80 px-1 rounded-sm">Ungido</span>. Esto enseña que fue elegido por Dios para cumplir la misión de salvar al mundo. Él fue enviado por el Padre para llevar a cabo la obra redentora y cumplir el propósito divino de salvación.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“El Espíritu de Jehová el Señor está sobre mí, porque me ungió Jehová...”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Isaias%2061:1&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Isaías 61:1 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Respondió Simón Pedro y dijo: Tú eres el Cristo, el Hijo del Dios viviente.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Mateo%2016:16&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Mateo 16:16 (Reina-Valera 1960)
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Next Button */}
      <div className="pt-16 flex justify-end">
        <Link
          href="/ensenanzas/cristologia/atributos"
          className="group flex items-center gap-2 px-4 py-2 border border-black/10 text-black/40 hover:text-black hover:border-black/20 transition-all text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          <span>Siguiente Tema</span>
          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

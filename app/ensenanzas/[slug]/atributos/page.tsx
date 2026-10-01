'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { QuickIndex } from '@/components/quick-index';

export default function AtributosPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const isCristologia = resolvedParams.slug === 'cristologia';

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-black overflow-hidden selection:bg-[#a3e635]/30">
      {/* Minimal Back Button */}
      <div className="fixed top-6 left-4 md:left-8 z-[60]">
        <Link href={`/ensenanzas/${resolvedParams.slug}/nombres`} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Volver a Nombres</span>
        </Link>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="80px" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" height="80px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 md:pt-12 scroll-smooth">
          <div className="mt-6 md:mt-10 grid content-start justify-items-center gap-4 md:gap-6 text-center text-black">
            <span className="relative max-w-[15ch] text-[10px] md:text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-5 md:after:h-6 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
              IV. LOS ATRIBUTOS DIVINOS DE CRISTO<br />{resolvedParams.slug.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 md:mt-10 w-full max-w-3xl px-4 md:px-12 pb-40">
            {isCristologia ? (
              <CristologiaAtributos />
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

function CristologiaAtributos() {
  return (
    <article className="space-y-12 md:space-y-16 pb-20">
      <h1 className="text-3xl md:text-[60px] font-bold text-center mb-6 md:mb-12 text-black tracking-tighter leading-none uppercase">
        IV. Los Atributos Divinos de Cristo
      </h1>

      <div className="space-y-10 text-black/80 text-sm md:text-base leading-relaxed">
        {/* Omnipotencia */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Omnipotencia</h2>
          <p>
            Este atributo significa <span className="bg-yellow-200/80 px-1 rounded-sm">posee todo poder absoluto</span>, porque Él es verdaderamente Dios. Su <span className="bg-yellow-200/80 px-1 rounded-sm">autoridad es suprema sobre toda la creación</span>. En el Evangelio de Mateo, Cristo mismo declaró su soberanía universal:
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Y Jesús se acercó y les habló diciendo: Toda potestad me es dada en el cielo y en la tierra.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Mateo%2028:18&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Mateo 28:18 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            Él demostró este poder divino durante su ministerio terrenal al tener autoridad para sanar las enfermedades de los hombres (
            <a href="https://www.biblegateway.com/passage/?search=Lucas%204:38-41&version=RVR1960" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-blue-600">Lucas 4:38-41</a>
            ) y, de manera aún más profunda, al tener la autoridad para perdonar pecados (
            <a href="https://www.biblegateway.com/passage/?search=Lucas%205:20-26&version=RVR1960" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-blue-600">Lucas 5:20-26</a>
            ), lo cual es una prerrogativa exclusiva de Dios. Su poder y dominio están por encima de todo principado y autoridad (
            <a href="https://www.biblegateway.com/passage/?search=Efesios%201:20-22&version=RVR1960" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-blue-600">Efesios 1:20-22</a>
            ).
          </p>
        </section>

        {/* Omnipresencia */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Omnipresencia</h2>
          <p>
            Este atributo se refiere a la <span className="bg-yellow-200/80 px-1 rounded-sm">facultad divina de estar presente en todas partes al mismo tiempo</span>. Aunque en su naturaleza humana Cristo ascendió al cielo y está a la diestra del Padre intercediendo por nosotros, en su naturaleza divina Él es omnipresente. Él dio esta promesa a sus seguidores:
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Mateo%2018:20&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Mateo 18:20 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <p>Y también afirmó antes de ascender:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“...y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Mateo%2028:20&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Mateo 28:20 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            Como hombre verdadero, Cristo intercede por nosotros y entiende nuestras oraciones; pero como Dios verdadero, Él está presente en todos los rincones de la tierra donde la Iglesia está orando e invocando Su nombre.
          </p>
        </section>

        {/* Omnisciencia */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Omnisciencia</h2>
          <p>
            La omnisciencia indica que Cristo, como Dios, posee un <span className="bg-yellow-200/80 px-1 rounded-sm">conocimiento perfecto e infinito de todas las cosas</span>. Sus discípulos reconocieron claramente este atributo divino cuando le dijeron:
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Ahora entendemos que sabes todas las cosas, y no necesitas que nadie te pregunte; por esto creemos que has salido de Dios.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Juan%2016:30&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Juan 16:30 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            Durante su ministerio, Jesús demostró que conocía plenamente lo oculto, incluyendo los pensamientos y las intenciones del corazón de las personas (
            <a href="https://www.biblegateway.com/passage/?search=Juan%202:24-25&version=RVR1960" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-blue-600">Juan 2:24-25</a>
            ). Dios no comparte este atributo con ninguna criatura, porque es exclusivo e intransferible, siendo propio únicamente de Su naturaleza divina. Al poseer omnisciencia, Cristo demuestra una vez más su deidad absoluta.
          </p>
        </section>
      </div>

      {/* Next Button */}
      <div className="pt-16 flex justify-end">
        <Link
          href="/ensenanzas/cristologia/propiedades"
          className="group flex items-center gap-2 px-4 py-2 border border-black/10 text-black/40 hover:text-black hover:border-black/20 transition-all text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          <span>Siguiente Tema</span>
          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

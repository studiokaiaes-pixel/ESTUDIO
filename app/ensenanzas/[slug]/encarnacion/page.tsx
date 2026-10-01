'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { QuickIndex } from '@/components/quick-index';

export default function EncarnacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const isCristologia = resolvedParams.slug === 'cristologia';

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-black overflow-hidden selection:bg-[#a3e635]/30">
      {/* Minimal Back Button */}
      <div className="fixed top-6 left-4 md:left-8 z-[60]">
        <Link href={`/ensenanzas/${resolvedParams.slug}/deidad`} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Volver a Deidad</span>
        </Link>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="80px" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" height="80px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 md:pt-12 scroll-smooth">
          <div className="mt-6 md:mt-10 grid content-start justify-items-center gap-4 md:gap-6 text-center text-black">
            <span className="relative max-w-[15ch] text-[10px] md:text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-5 md:after:h-6 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
              II. LA ENCARNACIÓN DE CRISTO<br />{resolvedParams.slug.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 md:mt-10 w-full max-w-3xl px-4 md:px-12 pb-40">
            {isCristologia ? (
              <CristologiaEncarnacion />
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

function CristologiaEncarnacion() {
  return (
    <article className="space-y-12 md:space-y-16 pb-20">
      <h1 className="text-3xl md:text-[60px] font-bold text-center mb-6 md:mb-12 text-black tracking-tighter leading-none uppercase">
        II. La Encarnación de Cristo
      </h1>

      <div className="space-y-10 text-black/80 text-sm md:text-base leading-relaxed">
        {/* Introducción */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black">Introducción</h2>
          <p>
            Antes de nacer como hombre, es decir, antes de la encarnación, Jesús, el Verbo o Hijo de Dios, no tenía cuerpo humano. <span className="bg-yellow-200/80 px-1 rounded-sm">Existía eternamente como Dios</span>, pero aún no había asumido la naturaleza humana en carne y hueso.
          </p>
          <p>
            Por esa razón, antes de la encarnación, no participaba de la experiencia humana en la forma en que nosotros la vivimos corporalmente. Sin embargo, cuando el Verbo se hizo carne, al nacer Jesucristo como hombre, <span className="bg-yellow-200/80 px-1 rounded-sm">asumió plenamente la naturaleza humana</span> y pudo experimentar lo que corresponde a la vida humana, como el dolor, el cansancio, el hambre, la tristeza y la alegría.
          </p>
          <div className="space-y-4">
            <p>La Escritura declara:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Juan%201:14&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Juan 1:14 (Reina-Valera 1960)
              </a>
            </div>
          </div>
        </section>

        {/* Antes de la encarnación */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right">Antes de la encarnación</h2>
          <p>
            Antes de la encarnación, Cristo <span className="bg-yellow-200/80 px-1 rounded-sm">existía como Dios eterno, pero sin cuerpo humano</span>. Él era el Verbo divino, eterno, santo y glorioso, y no había tomado aún la naturaleza humana.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Juan%201:1&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Juan 1:1 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            Por ello, no había entrado todavía en las limitaciones propias de la experiencia humana terrenal, como el hambre, el sufrimiento físico o el cansancio corporal.
          </p>
        </section>

        {/* Después de la encarnación */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right">Después de la encarnación</h2>
          <p>
            Después de la encarnación, Jesús <span className="bg-yellow-200/80 px-1 rounded-sm">tomó nuestra naturaleza humana completa, con cuerpo, mente y emociones</span>. De esta manera, Él pudo vivir en carne propia la experiencia humana, sin dejar de ser Dios.
          </p>
          <p>
            La encarnación significa que el <span className="bg-yellow-200/80 px-1 rounded-sm">Hijo de Dios asumió una verdadera humanidad</span>. No fue una apariencia, sino una realidad plena. Cristo vivió como hombre verdadero entre los hombres.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Por lo cual debía ser en todo semejante a sus hermanos, para venir a ser misericordioso y fiel sumo sacerdote en lo que a Dios se refiere, para expiar los pecados del pueblo.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Hebreos%202:17&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Hebreos 2:17 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            Por eso, Jesucristo pudo comprender perfectamente lo que sentimos, pues Él mismo vivió en carne propia la realidad humana. Conoció el dolor, la fatiga, el hambre, la tristeza y también el amor y la compasión.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades, sino uno que fue tentado en todo según nuestra semejanza, pero sin pecado.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Hebreos%204:15&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Hebreos 4:15 (Reina-Valera 1960)
              </a>
            </div>
          </div>
        </section>

        {/* Cristo es Dios y Hombre al 100% */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right"><span className="bg-yellow-200/80 px-1 rounded-sm">Cristo es Dios y Hombre al 100%</span></h2>
          <p>
            Jesús tiene dos naturalezas completas y verdaderas al mismo tiempo:
          </p>
          <ol className="list-decimal ml-6 space-y-1 font-medium">
            <li><span className="font-bold">Naturaleza divina:</span> es Dios verdadero.</li>
            <li><span className="font-bold">Naturaleza humana:</span> es hombre verdadero.</li>
          </ol>
          <p>
            La encarnación no significa que Cristo dejó de ser Dios, sino que, permaneciendo como verdadero Dios, asumió también una verdadera humanidad. Por tanto, <span className="bg-yellow-200/80 px-1 rounded-sm">en una sola persona se unen perfectamente la naturaleza divina y la naturaleza humana</span>.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Porque en él habita corporalmente toda la plenitud de la Deidad.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Colosenses%202:9&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Colosenses 2:9 (Reina-Valera 1960)
              </a>
            </div>
          </div>
        </section>

        {/* La doble naturaleza de Cristo */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right">La doble naturaleza de Cristo</h2>
          <p>
            La unión de la naturaleza divina y humana en Cristo le capacita para <span className="bg-yellow-200/80 px-1 rounded-sm">revelar al Padre y representar al hombre delante de Dios</span>. Como Dios verdadero, revela perfectamente al Padre; y como hombre verdadero, representa al hombre delante de Dios e intercede ante el Padre.
          </p>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=1%20Timoteo%202:5&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                1 Timoteo 2:5 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            De este modo, la encarnación de Cristo es una verdad central de la fe cristiana, pues nos muestra que el Hijo eterno de Dios vino al mundo en forma humana para identificarse con nosotros y cumplir la obra de redención.
          </p>
        </section>
      </div>

      {/* Next Button */}
      <div className="pt-16 flex justify-end">
        <Link
          href="/ensenanzas/cristologia/nombres"
          className="group flex items-center gap-2 px-4 py-2 border border-black/10 text-black/40 hover:text-black hover:border-black/20 transition-all text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          <span>Siguiente Tema</span>
          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

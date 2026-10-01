'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { QuickIndex } from '@/components/quick-index';

export default function DeidadPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const isCristologia = resolvedParams.slug === 'cristologia';

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-black overflow-hidden selection:bg-[#a3e635]/30">
      {/* Minimal Back Button */}
      <div className="fixed top-6 left-4 md:left-8 z-[60]">
        <Link href={`/ensenanzas/${resolvedParams.slug}/introduccion`} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Volver a Introducción</span>
        </Link>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="80px" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" height="80px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 md:pt-12 scroll-smooth">
          <div className="mt-6 md:mt-10 grid content-start justify-items-center gap-4 md:gap-6 text-center text-black">
            <span className="relative max-w-[15ch] text-[10px] md:text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-5 md:after:h-6 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
              I. LA DEIDAD DE CRISTO<br />{resolvedParams.slug.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 md:mt-10 w-full max-w-3xl px-4 md:px-12 pb-40">
            {isCristologia ? (
              <CristologiaDeidad />
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

function CristologiaDeidad() {
  return (
    <article className="space-y-12 md:space-y-16 pb-20">
      <h1 className="text-3xl md:text-[60px] font-bold text-center mb-6 md:mb-12 text-black tracking-tighter leading-none uppercase">
        I. La Deidad de Cristo
      </h1>

      <div className="space-y-10 text-black/80 text-sm md:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black">1. La realidad de las dos naturalezas</h2>
          <p>
            Este punto enseña que Jesucristo <span className="bg-yellow-200/80 px-1 rounded-sm">posee verdaderamente dos naturalezas: una divina y una humana</span>. No se trata de una apariencia ni de una representación simbólica, sino de una realidad plena. Jesús es <span className="bg-yellow-200/80 px-1 rounded-sm">verdaderamente Dios y verdaderamente hombre</span>.
          </p>
          <div className="space-y-4">
            <p>La Biblia confirma su divinidad cuando dice:</p>
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
          <div className="space-y-4">
            <p>También confirma su humanidad al declarar:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Por tanto, debía ser en todo semejante a sus hermanos, para venir a ser misericordioso y fiel sumo sacerdote en lo que a Dios se refiere, para expiar los pecados del pueblo.”</p>
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
            Estas verdades nos muestran que Cristo participó de nuestra humanidad sin dejar de ser Dios. Él vivió entre los hombres, sintió hambre, cansancio, dolor y tristeza, pero al mismo tiempo manifestó su deidad con poder, autoridad y santidad.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black">2. La integridad de las dos naturalezas</h2>
          <p>
            La integridad de las dos naturalezas significa que tanto la naturaleza divina como la naturaleza humana de Cristo están <span className="bg-yellow-200/80 px-1 rounded-sm">completas y perfectas</span>. Jesús no es mitad Dios y mitad hombre; Él es <span className="bg-yellow-200/80 px-1 rounded-sm">completamente Dios y completamente hombre</span>. En Él no hubo mezcla, disminución ni alteración de ninguna de sus naturalezas.
          </p>
          <div className="space-y-4">
            <p>La Palabra de Dios dice:</p>
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
          <div className="space-y-4">
            <p>Y también declara:</p>
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
          <p>
            Estos pasajes nos enseñan que Cristo posee toda la plenitud de la Deidad y, al mismo tiempo, una verdadera humanidad. Su naturaleza humana fue real, pero sin pecado; su naturaleza divina fue plena, eterna e inmutable.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black">3. La unión de las dos naturalezas en una sola persona</h2>
          <p>
            Aunque Jesucristo tiene dos naturalezas, no por ello es dos personas. La doctrina bíblica enseña que en Cristo hay <span className="bg-yellow-200/80 px-1 rounded-sm">una sola persona</span>, en la cual están <span className="bg-yellow-200/80 px-1 rounded-sm">unidas la naturaleza divina y la naturaleza humana sin confusión, sin cambio, sin división y sin separación</span>. Esta unión es un misterio glorioso de la fe cristiana, pero es una verdad revelada claramente en las Escrituras.
          </p>
          <div className="space-y-4">
            <p>La Biblia dice:</p>
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
          <div className="space-y-4">
            <p>Y también:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Grande es el misterio de la piedad: Dios fue manifestado en carne...”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=1%20Timoteo%203:16&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                1 Timoteo 3:16 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            Jesucristo es una sola persona. No son dos seres distintos actuando por separado, sino una sola persona divina con dos naturalezas perfectas. Por ello, podemos afirmar con fidelidad bíblica que Jesús es <span className="bg-yellow-200/80 px-1 rounded-sm">cien por ciento Dios y cien por ciento hombre al mismo tiempo</span>.
          </p>
        </section>

        {/* Section Importance */}
        <section className="space-y-4 pt-6 border-t border-black/5">
          <h2 className="text-xl md:text-2xl font-bold text-black italic">Importancia de esta doctrina para la Iglesia</h2>
          <p>
            En la actualidad, muchas personas que desean acercarse a Dios terminan siendo confundidas por enseñanzas falsas o incompletas acerca de Jesucristo. Por eso, la Iglesia tiene la responsabilidad de enseñar con claridad que <span className="bg-yellow-200/80 px-1 rounded-sm">solo Jesús es el camino verdadero, la revelación perfecta del Padre y el fundamento de la fe cristiana</span>.
          </p>
          <div className="space-y-4">
            <p>Nuestro Señor mismo declaró:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Juan%2014:6&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Juan 14:6 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            La fe cristiana se sostiene sobre la persona de Cristo. Él es el centro del Evangelio, la razón de ser de la Iglesia y la esperanza eterna del creyente. No puede existir verdadera doctrina cristiana si Cristo no ocupa el lugar principal. Conocerle correctamente no solo fortalece la mente, sino también el corazón, pues toda vida espiritual auténtica depende de una relación verdadera con Él.
          </p>
          <div className="space-y-4">
            <p>La Escritura también afirma:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Porque nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=1%20Corintios%203:11&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                1 Corintios 3:11 (Reina-Valera 1960)
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Next Button */}
      <div className="pt-16 flex justify-end">
        <Link
          href="/ensenanzas/cristologia/encarnacion"
          className="group flex items-center gap-2 px-4 py-2 border border-black/10 text-black/40 hover:text-black hover:border-black/20 transition-all text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          <span>Siguiente Tema</span>
          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

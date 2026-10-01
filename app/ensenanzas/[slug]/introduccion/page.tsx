'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { QuickIndex } from '@/components/quick-index';

export default function IntroduccionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const isCristologia = resolvedParams.slug === 'cristologia';

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-black overflow-hidden selection:bg-[#a3e635]/30">
      {/* Minimal Back Button */}
      <div className="fixed top-6 left-4 md:left-8 z-[60]">
        <Link href={`/ensenanzas/${resolvedParams.slug}`} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Volver al Índice</span>
        </Link>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="80px" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" height="80px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 md:pt-12 scroll-smooth">
          <div className="mt-6 md:mt-10 grid content-start justify-items-center gap-4 md:gap-6 text-center text-black">
            <span className="relative max-w-[15ch] text-[10px] md:text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-5 md:after:h-6 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
              INTRODUCCIÓN<br />{resolvedParams.slug.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 md:mt-10 w-full max-w-3xl px-4 md:px-12 pb-40">
            {isCristologia ? (
              <CristologiaIntroduccion />
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

function CristologiaIntroduccion() {
  return (
    <article className="space-y-6 md:space-y-8 pb-20">
      <h1 className="text-3xl md:text-[80px] font-bold text-center mb-6 md:mb-12 text-black tracking-tighter leading-none uppercase">
        Introducción
      </h1>

      <div className="space-y-6 text-black/80 text-sm md:text-base leading-relaxed">
        <p>
          La Cristología es la <span className="bg-yellow-200/80 px-1 rounded-sm">doctrina bíblica que estudia la persona y la obra de nuestro Señor Jesucristo</span>. Su propósito es explicar quién es Jesús, cuál es la naturaleza de su ser, cuál fue su misión en la tierra y qué significado tiene su obra redentora para la humanidad. Este estudio es fundamental para la fe cristiana, pues Cristo no es un personaje secundario en las Escrituras, sino el <span className="bg-yellow-200/80 px-1 rounded-sm">centro mismo de la revelación divina y el fundamento de la salvación</span>.
        </p>

        <p>
          La Biblia nos enseña que en Cristo hemos sido bendecidos con toda bendición espiritual, y que en Él se encuentran la plenitud de la gracia, la verdad y la redención de Dios para el hombre. Por ello, la Iglesia de Jesucristo tiene la urgente necesidad de conocerle, adorarle, obedecerle y disfrutar plenamente de todas las riquezas espirituales que el Padre ha concedido en su Hijo amado.
        </p>

        <div className="space-y-2">
          <p>Como está escrito:</p>
          <div className="pl-4 border-l-2 border-black/10">
            <p className="font-bold">“Bendito sea el Dios y Padre de nuestro Señor Jesucristo, que nos bendijo con toda bendición espiritual en los lugares celestiales en Cristo.”</p>
            <a
              href="https://www.biblegateway.com/passage/?search=Efesios%201:3&version=RVR1960"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-1 opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
            >
              Efesios 1:3 (Reina-Valera 1960)
            </a>
          </div>
        </div>

        <p>
          En un tiempo en que las corrientes filosóficas modernas, los pensamientos humanistas y las falsas doctrinas buscan desviar la atención de la verdad bíblica, resulta imprescindible que los creyentes estén sólidamente fundamentados en la doctrina de la persona de Jesucristo. Cuando no existe una enseñanza clara y firme acerca de Cristo, muchos pueden ser confundidos y arrastrados por ideas erróneas que debilitan la fe.
        </p>

        <p>
          La enseñanza bíblica de la Cristología fortalece al creyente, afirma su confianza en Dios y le ayuda a comprender que Jesucristo no es solo un maestro moral o un ejemplo de bondad, sino el <span className="bg-yellow-200/80 px-1 rounded-sm">Hijo eterno de Dios, el Verbo hecho carne, el Salvador del mundo y el único mediador entre Dios y los hombres</span>.
        </p>

        <div className="space-y-2">
          <p>La Escritura declara:</p>
          <div className="pl-4 border-l-2 border-black/10">
            <p className="font-bold">“Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.”</p>
            <a
              href="https://www.biblegateway.com/passage/?search=Juan%201:14&version=RVR1960"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-1 opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
            >
              Juan 1:14 (Reina-Valera 1960)
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <p>Asimismo, la Palabra de Dios afirma:</p>
          <div className="pl-4 border-l-2 border-black/10">
            <p className="font-bold">“Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre.”</p>
            <a
              href="https://www.biblegateway.com/passage/?search=1%20Timoteo%202:5&version=RVR1960"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-1 opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
            >
              1 Timoteo 2:5 (Reina-Valera 1960)
            </a>
          </div>
        </div>

        <p>
          Como ocurre con otras doctrinas esenciales de la Biblia, la Cristología ha sido también motivo de controversia a lo largo de la historia. Muchos debates teológicos han surgido en torno a la persona de Cristo, especialmente en relación con su naturaleza divina y su naturaleza humana. El Dr. Strong señala que las controversias respecto a la persona de Cristo giran principalmente sobre tres puntos fundamentales:
        </p>

        <ol className="list-decimal ml-6 space-y-2 font-medium">
          <li><span className="bg-yellow-200/80 px-1 rounded-sm">La realidad de las dos naturalezas</span>.</li>
          <li><span className="bg-yellow-200/80 px-1 rounded-sm">La integridad de las dos naturalezas</span>.</li>
          <li><span className="bg-yellow-200/80 px-1 rounded-sm">La unión de las dos naturalezas en una sola persona</span>.</li>
        </ol>
      </div>

      {/* Next Button */}
      <div className="pt-16 flex justify-end">
        <Link
          href="/ensenanzas/cristologia/deidad"
          className="group flex items-center gap-2 px-4 py-2 border border-black/10 text-black/40 hover:text-black hover:border-black/20 transition-all text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          <span>Siguiente Tema</span>
          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

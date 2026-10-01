'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { QuickIndex } from '@/components/quick-index';

export default function PropiedadesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const isCristologia = resolvedParams.slug === 'cristologia';

  return (
    <main className="min-h-screen bg-[#f5f4f3] text-black overflow-hidden selection:bg-[#a3e635]/30">
      {/* Minimal Back Button */}
      <div className="fixed top-6 left-4 md:left-8 z-[60]">
        <Link href={`/ensenanzas/${resolvedParams.slug}/atributos`} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Volver a Atributos</span>
        </Link>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="80px" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" height="80px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 md:pt-12 scroll-smooth">
          <div className="mt-6 md:mt-10 grid content-start justify-items-center gap-4 md:gap-6 text-center text-black">
            <span className="relative max-w-[15ch] text-[10px] md:text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-5 md:after:h-6 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
              V. PROPIEDADES DIVINAS DE CRISTO<br />{resolvedParams.slug.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 md:mt-10 w-full max-w-3xl px-4 md:px-12 pb-40">
            {isCristologia ? (
              <CristologiaPropiedades />
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

function CristologiaPropiedades() {
  return (
    <article className="space-y-12 md:space-y-16 pb-20">
      <h1 className="text-3xl md:text-[60px] font-bold text-center mb-6 md:mb-12 text-black tracking-tighter leading-none uppercase">
        V. Propiedades Divinas de Cristo
      </h1>

      <div className="space-y-10 text-black/80 text-sm md:text-base leading-relaxed">
        {/* Su propia existencia */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Su propia existencia</h2>
          <p>
            Este es un atributo que se relaciona con la existencia propia de Cristo. La <span className="bg-yellow-200/80 px-1 rounded-sm">base de Su existencia se encuentra en Él mismo</span>. Él es su propia causa. Como Dios, Cristo es <span className="bg-yellow-200/80 px-1 rounded-sm">eterno y existe por Sí mismo</span>, sin depender de nadie para ser. Su existencia no tiene principio ni fin, pues pertenece a la naturaleza divina.
          </p>
          <div className="space-y-4">
            <p>La Escritura revela esta verdad cuando Dios dice:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Y respondió Dios a Moisés: YO SOY EL QUE SOY.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Exodo%203:14&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Éxodo 3:14 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <p>Asimismo, el Evangelio declara acerca de Cristo:</p>
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
            <p>Y también Jesús afirmó:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“De cierto, de cierto os digo: Antes que Abraham fuese, yo soy.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Juan%208:58&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Juan 8:58 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            Estas declaraciones muestran que Cristo posee existencia eterna, independiente y divina.
          </p>
        </section>

        {/* Su inmutabilidad */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Su inmutabilidad</h2>
          <p>
            La inmutabilidad es aquella perfección por la cual Dios <span className="bg-yellow-200/80 px-1 rounded-sm">permanece sin cambio alguno</span>, no solo en Su ser, sino también en Sus perfecciones, propósitos y promesas. En Dios no existe variación, deterioro ni mejora, porque Él es perfecto en sí mismo. Esta verdad también se aplica a Cristo, pues su naturaleza divina es inmutable.
          </p>
          <div className="space-y-4">
            <p>La Palabra de Dios declara:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Jesucristo es el mismo ayer, y hoy, y por los siglos.”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Hebreos%2013:8&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Hebreos 13:8 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <p>Asimismo, la Escritura enseña:</p>
            <div className="pl-4 border-l-2 border-black/10 space-y-2">
              <p className="font-bold text-lg">“Porque yo Jehová no cambio...”</p>
              <a
                href="https://www.biblegateway.com/passage/?search=Malaquias%203:6&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
              >
                Malaquías 3:6 (Reina-Valera 1960)
              </a>
            </div>
          </div>
          <p>
            Por lo tanto, Cristo permanece eternamente el mismo en Su ser, en Su poder, en Su santidad y en Su fidelidad.
          </p>
        </section>

        {/* Su infinitud */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-black text-right underline underline-offset-4">Su infinitud</h2>
            <p>
              La infinitud es aquella perfección divina por medio de la cual Dios está <span className="bg-yellow-200/80 px-1 rounded-sm">libre de toda limitación</span>. Él no puede ser limitado por el tiempo ni por el espacio. Cristo, en cuanto Dios, existe antes de todo y está por encima de toda limitación creada. Él es el Alfa y la Omega, el principio y el fin.
            </p>
            <div className="space-y-4">
              <p>La Escritura declara:</p>
              <div className="pl-4 border-l-2 border-black/10 space-y-2">
                <p className="font-bold text-lg">“No temas; yo soy el primero y el último.”</p>
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
            <p>
              La infinitud de Dios es una realidad plenamente comprendida solo por Él mismo. Sin embargo, la Biblia nos permite contemplar algunos aspectos de esta infinitud divina.
            </p>
          </div>

          {/* a. Su absoluta perfección */}
          <div className="space-y-4 pl-4 md:pl-8">
            <h3 className="text-lg md:text-xl font-bold text-black text-right">a. Su absoluta perfección</h3>
            <p>
              El poder de Dios es inagotable; Su santidad, Su sabiduría y Su conocimiento son infinitos. Del mismo modo, Su amor y Su grandeza no tienen medida.
            </p>
            <div className="space-y-4">
              <div className="pl-4 border-l-2 border-black/10 space-y-2">
                <p className="font-bold text-lg">“He aquí, Dios es grande, y nosotros no le conocemos, ni se puede seguir la huella de sus años.”</p>
                <a
                  href="https://www.biblegateway.com/passage/?search=Job%2036:26&version=RVR1960"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
                >
                  Job 36:26 (Reina-Valera 1960)
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="pl-4 border-l-2 border-black/10 space-y-2">
                <p className="font-bold text-lg">“Grande es Jehová, y digno de suprema alabanza; y su grandeza es inescrutable.”</p>
                <a
                  href="https://www.biblegateway.com/passage/?search=Salmo%20145:3&version=RVR1960"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
                >
                  Salmo 145:3 (Reina-Valera 1960)
                </a>
              </div>
            </div>
          </div>

          {/* b. Su eternidad */}
          <div className="space-y-4 pl-4 md:pl-8">
            <h3 className="text-lg md:text-xl font-bold text-black text-right">b. Su eternidad</h3>
            <p>
              La eternidad de Dios se describe en la Biblia como una duración sin principio ni fin. Cristo, en cuanto Dios, participa plenamente de esta eternidad divina.
            </p>
            <div className="space-y-4">
              <div className="pl-4 border-l-2 border-black/10 space-y-2">
                <p className="font-bold text-lg">“Antes que naciesen los montes y formases la tierra y el mundo, desde el siglo y hasta el siglo, tú eres Dios.”</p>
                <a
                  href="https://www.biblegateway.com/passage/?search=Salmo%2090:2&version=RVR1960"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
                >
                  Salmo 90:2 (Reina-Valera 1960)
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="pl-4 border-l-2 border-black/10 space-y-2">
                <p className="font-bold text-lg">“Pero tú eres el mismo, y tus años no se acabarán.”</p>
                <a
                  href="https://www.biblegateway.com/passage/?search=Salmo%20102:27&version=RVR1960"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
                >
                  Salmo 102:27 (Reina-Valera 1960)
                </a>
              </div>
            </div>
          </div>
        </section>

        <p className="pt-6 border-t border-black/5 font-medium italic text-center">
          Por ello, podemos afirmar que Jesucristo, en su naturaleza divina, es eterno, infinito e inmutable.
        </p>
      </div>

    </article>
  );
}

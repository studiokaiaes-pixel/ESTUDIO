import React from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Clock, FileText, CheckCircle2, BookOpen, Download, Figma, Layers } from 'lucide-react';
import Image from 'next/image';

export default async function MaterialItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  // Mock data based on the slug
  const isFigma = resolvedParams.slug.includes('figma') || resolvedParams.slug.includes('dashboard') || resolvedParams.slug.includes('app') || resolvedParams.slug.includes('kit') || resolvedParams.slug.includes('portfolio');

  const materialData = {
    title: isFigma ? "Plantilla UI Premium" : "Pack de Assets 3D",
    author: isFigma ? "UI Team" : "Design Studio",
    type: isFigma ? "PLANTILLA FIGMA" : "ASSETS",
    size: isFigma ? "120 MB" : "450 MB",
    format: isFigma ? ".fig" : ".png, .obj",
    description: isFigma
      ? "Acelera tu flujo de trabajo con esta plantilla premium para Figma. Incluye más de 200 componentes, estilos globales, variables y pantallas listas para usar en tu próximo proyecto."
      : "Un paquete completo de assets 3D de alta calidad para tus proyectos. Incluye iconos, ilustraciones y elementos decorativos listos para usar en web y móvil.",
    bgColor: isFigma ? "bg-[#3b82f6]" : "bg-[#e5e5e5]",
    textColor: isFigma ? "text-white" : "text-black",
  };

  const features = isFigma ? [
    { title: "Componentes Auto Layout", detail: "Sí" },
    { title: "Variables y Estilos", detail: "Sí" },
    { title: "Pantallas incluidas", detail: "45+" },
    { title: "Iconos vectoriales", detail: "100+" },
    { title: "Actualizaciones", detail: "De por vida" },
  ] : [
    { title: "Resolución", detail: "4K (3840x2160)" },
    { title: "Formatos", detail: "PNG transparente, OBJ" },
    { title: "Elementos únicos", detail: "50+" },
    { title: "Variantes de color", detail: "3 por elemento" },
    { title: "Uso comercial", detail: "Permitido" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#a3e635] selection:text-black pb-24">
      {/* Simple Header */}
      <header className="w-full py-6 px-4 md:px-8 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#050505]/80 backdrop-blur-md z-50">
        <Link href="/material" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver a Material</span>
        </Link>
        <div className="text-xl font-bold tracking-tighter uppercase">
          MATE<span className="text-[#a3e635]">RIAL</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Column: Media & Description */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">

            {/* Media Container */}
            <div className={`w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center border border-white/5 ${materialData.bgColor}`}>
              {/* Decorative background elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

              {/* Icon */}
              <div className="z-20 flex flex-col items-center gap-4">
                {isFigma ? (
                  <Figma size={64} className={materialData.textColor} strokeWidth={1.5} />
                ) : (
                  <Layers size={64} className={materialData.textColor} strokeWidth={1.5} />
                )}
              </div>

              {/* Title overlay inside media */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className={`text-[10px] md:text-xs uppercase tracking-widest font-mono mb-2 ${materialData.textColor} opacity-80`}>
                  {materialData.type}
                </div>
                <h1 className={`text-3xl md:text-5xl font-bold tracking-tight ${materialData.textColor}`}>
                  {materialData.title}
                </h1>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-medium text-white">Acerca de este recurso</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {materialData.description}
              </p>
            </div>

          </div>

          {/* Right Column: Info & Features */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">

            {/* Action Card */}
            <div className="bg-[#111] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 sticky top-28">
              <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/author2/100/100" alt={materialData.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Creado por</p>
                  <p className="font-medium text-white">{materialData.author}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <FileText size={20} className="text-[#a3e635]" />
                  <span>{materialData.size}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#a3e635]" />
                  <span>Formato {materialData.format}</span>
                </div>
              </div>

              <button className="w-full py-4 rounded-full bg-[#a3e635] text-black font-semibold text-lg hover:bg-[#84cc16] transition-colors flex items-center justify-center gap-2 mt-2">
                <Download size={20} />
                Descargar Archivo
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-xl font-medium text-white mb-2">Características</h3>
              <div className="flex flex-col">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b border-white/5 group px-2 rounded-lg transition-colors">
                    <span className="text-gray-300">{item.title}</span>
                    <span className="text-sm font-medium text-white">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

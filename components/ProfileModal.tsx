import React, { useEffect, useState } from 'react';
import { X, MapPin, Link as LinkIcon, Briefcase, Twitter, Target, Sparkles, Star, GitCommit, Sliders, Coffee } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Background Glow */}
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0f3826]/40 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative w-full max-w-3xl mx-auto flex flex-col min-h-screen z-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:fixed md:top-8 md:right-8 p-2.5 text-gray-400 hover:text-white transition-all rounded-full hover:bg-white/10 z-50 bg-[#0a0a0a] border border-white/10 shadow-2xl"
        >
          <X size={20} />
        </button>

        {/* Content Container */}
        <div className="p-8 md:p-16 flex flex-col gap-16 pb-32">

          {/* Hero Profile Section */}
          <div className="flex flex-col items-center gap-8 mt-8">
            <div className="relative group cursor-pointer" onClick={() => setIsExpanded(true)}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#22c55e]/20 to-[#4ade80]/20 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 bg-[#0a0a0a]">
                <Image
                  src="https://lh3.googleusercontent.com/d/15ESWllXvWWNaUEUphfCgcaQYSFXnc9BB"
                  alt="Kauê"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Expanded Image Overlay */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsExpanded(false)}
                  className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-2xl aspect-square rounded-2xl overflow-hidden border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src="https://lh3.googleusercontent.com/d/15ESWllXvWWNaUEUphfCgcaQYSFXnc9BB"
                      alt="Kauê expanded"
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-center text-center gap-3">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Kauê</h1>
              <div className="h-px w-12 bg-[#22c55e] opacity-60"></div>
              <p className="text-lg md:text-xl text-gray-400 font-light max-w-md italic">
                &quot;Aprendiendo a vivir la Palabra de Dios, un día a la vez&quot;
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-16">

            {/* Presentation */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-[#22c55e] font-mono text-sm tracking-widest uppercase">01 // Presentación</span>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-medium text-white">¡Hola, soy Kauê!</h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                  Este espacio es solo un lugar donde guardo y comparto lo que estoy aprendiendo con Dios. Nada perfecto, solo real. No lo sé todo, estoy aprendiendo. Aquí comparto lo que voy entendiendo de la Biblia a lo largo del camino. Si esto te ayuda de alguna forma, ya valió la pena.
                </p>
              </div>
            </section>

            {/* Vibe / Walking */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-[#22c55e] font-mono text-sm tracking-widest uppercase">02 // Mi Caminar</span>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10">
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic font-light text-center">
                  &quot;Intentando ser constante, incluso fallando a veces. Aprendiendo a volver a Dios todos los días.&quot;
                </p>
              </div>
            </section>

            {/* Practices */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-[#22c55e] font-mono text-sm tracking-widest uppercase">03 // Prácticas</span>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Lectura Bíblica', desc: 'Sumergiéndome en las Escrituras diariamente.' },
                  { title: 'Oración', desc: 'Buscando una conversación honesta con el Padre.' },
                  { title: 'Disciplina', desc: 'Entrenando el espíritu para la constancia.' },
                  { title: 'Búsqueda Real', desc: 'Anhelando Su presencia por encima de todo.' }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#22c55e]/30 transition-colors group">
                    <h3 className="text-white font-medium mb-1 group-hover:text-[#22c55e] transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Topics */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-[#22c55e] font-mono text-sm tracking-widest uppercase">04 // Aprendizaje</span>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Fé', 'Disciplina', 'Luchas personales', 'Intimidad con Dios', 'Constancia', 'Gracia'].map((topic) => (
                  <span key={topic} className="px-5 py-2.5 bg-[#0a0a0a] border border-white/10 rounded-full text-sm text-gray-400 hover:text-white hover:border-[#22c55e]/50 transition-all cursor-default">
                    {topic}
                  </span>
                ))}
              </div>
            </section>

            {/* Mission */}
            <section className="flex flex-col gap-8 pt-8">
              <div className="text-center space-y-4">
                <span className="text-[#22c55e] font-mono text-xs tracking-[0.3em] uppercase">Misión Personal</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Solo quiero crecer con Dios y, si es posible, ayudar a alguien en el camino.
                </h2>
                <div className="pt-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-medium uppercase tracking-widest">
                    <Sparkles size={14} /> Mi jornada: En construcción
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

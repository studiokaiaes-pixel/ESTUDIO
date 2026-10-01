"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "¿Este sitio es para enseñar la Biblia?",
    answer: "No. Este es un espacio personal donde comparto mi proceso, mis reflexiones y lo que he aprendido en mi caminar con Dios."
  },
  {
    question: "¿Qué vas a encontrar aquí?",
    answer: "Anotaciones, versículos, reflexiones y aprendizajes que forman parte de mi viaje espiritual."
  },
  {
    question: "¿Cuál es el propósito de este proyecto?",
    answer: "Registrar mi caminar con Dios y reunir, en un solo lugar, aquello que vengo aprendiendo a lo largo del proceso."
  },
  {
    question: "¿Este contenido sustituye a la Biblia?",
    answer: "No. Nada sustituye la lectura de la Palabra. Este espacio es solo un registro personal de aprendizaje y reflexión."
  },
  {
    question: "¿Por qué compartir esto?",
    answer: "Porque compartir también forma parte del camino, y este espacio refleja aquello que Dios ha estado trabajando en mí."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-24 md:mb-32">
      {/* Left Column */}
      <div className="w-full md:w-1/3 flex flex-col">
        <h2 className="text-4xl md:text-[44px] font-semibold text-white tracking-tight mb-6">Sobre este espacio</h2>
        <p className="text-[#a1a1aa] text-base md:text-lg mb-8">Un espacio para crecer en la fe, entender la Biblia y conocer más a Cristo</p>
        <p className="text-[#a1a1aa] text-[13px] leading-relaxed w-[318.656px] max-w-full">
          Este espacio fue creado para reunir reflexiones, aprendizajes y registros de aquello que he vivido y entendido a lo largo de mi caminar con Dios. No como alguien que ya llegó, sino como alguien que continúa aprendiendo, siendo moldeado y volviendo siempre a la Palabra.
        </p>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-white/5 rounded-[1.5rem] bg-[#111] transition-colors duration-300 ${openIndex === index ? 'bg-[#161616] border-white/10' : 'hover:bg-[#161616]'}`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
            >
              <span className={`text-base md:text-lg font-medium transition-colors ${openIndex === index ? 'text-[#a3e635]' : 'text-white group-hover:text-[#a3e635]'}`}>
                {faq.question}
              </span>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${openIndex === index ? 'bg-[#a3e635]' : 'bg-white/5 group-hover:bg-white/10'}`}>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-black' : 'text-white'}`}
                />
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out px-5 md:px-6 ${
                openIndex === index ? 'max-h-40 opacity-100 pb-5 md:pb-6' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

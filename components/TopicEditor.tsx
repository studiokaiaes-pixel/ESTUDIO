'use client';

import React, { useState, useRef } from 'react';
import { Course, Topic, ContentBlock } from '@/lib/coursesStore';
import { parseWordDocument } from '@/lib/wordParser';
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Heading,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Highlighter,
  Quote,
  Image as ImageIcon,
  List,
  Save,
  Type,
  FileUp,
  FileText,
  Loader2,
} from 'lucide-react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

export function TopicEditor({
  course,
  topic,
  onSaveTopic,
  onBack,
}: {
  course: Course;
  topic: Topic;
  onSaveTopic: (updatedTopic: Topic) => void;
  onBack: () => void;
}) {
  const [currentTopic, setCurrentTopic] = useState<Topic>(JSON.parse(JSON.stringify(topic)));
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    currentTopic.blocks[0]?.id || null
  );
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeBlock = currentTopic.blocks.find((b) => b.id === selectedBlockId);

  const handleTitleChange = (val: string) => {
    setCurrentTopic((prev) => ({ ...prev, title: val }));
  };

  const handleSubtitleChange = (val: string) => {
    setCurrentTopic((prev) => ({ ...prev, subtitle: val }));
  };

  const handleWordFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsImporting(true);
      const buffer = await file.arrayBuffer();
      const importedBlocks = await parseWordDocument(buffer);

      if (importedBlocks.length > 0) {
        setCurrentTopic((prev) => ({
          ...prev,
          blocks: [...prev.blocks, ...importedBlocks],
        }));
        setSelectedBlockId(importedBlocks[0].id);
      }
    } catch (err) {
      alert('Error al leer el archivo Word. Por favor asegúrate de seleccionar un archivo .docx válido.');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: 'block-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      type,
      text:
        type === 'heading'
          ? 'NUEVO TÍTULO DE SECCIÓN'
          : type === 'paragraph'
          ? 'Escribe tu párrafo aquí directamente en el documento...'
          : '',
      quoteText: type === 'quote' ? '“Escribe el versículo o cita bíblica aquí”' : undefined,
      quoteReference: type === 'quote' ? 'Libro 1:1 (Reina-Valera 1960)' : undefined,
      quoteUrl: type === 'quote' ? 'https://www.biblegateway.com/' : undefined,
      listType: type === 'list' ? 'bullet' : undefined,
      items: type === 'list' ? ['Primer punto', 'Segundo punto'] : undefined,
      style: {
        fontSize: type === 'heading' ? '2xl' : 'base',
        textAlign: 'left',
        bold: type === 'heading',
        italic: false,
        highlight: false,
        underline: false,
      },
    };

    setCurrentTopic((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
    setSelectedBlockId(newBlock.id);
  };

  const updateActiveStyle = (styleUpdates: Partial<NonNullable<ContentBlock['style']>>) => {
    if (!selectedBlockId) return;
    setCurrentTopic((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => {
        if (b.id !== selectedBlockId) return b;
        return {
          ...b,
          style: {
            ...(b.style || {}),
            ...styleUpdates,
          },
        };
      }),
    }));
  };

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setCurrentTopic((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)),
    }));
  };

  const removeBlock = (blockId: string) => {
    setCurrentTopic((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== blockId),
    }));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...currentTopic.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    setCurrentTopic((prev) => ({ ...prev, blocks: newBlocks }));
  };

  return (
    <div className="flex flex-col h-screen bg-[#111111] text-white font-sans overflow-hidden">
      {/* Hidden File Input for Word .docx Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleWordFileUpload}
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
      />

      {/* Word-like Top Navigation Header */}
      <div className="bg-[#1a1a1a] border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#22c55e]/20 text-[#22c55e] font-mono px-2 py-0.5 rounded font-bold uppercase">
                Editor estilo Word
              </span>
              <span className="text-xs text-gray-400">Curso: {course.title}</span>
            </div>
            <h2 className="text-base font-bold text-white uppercase">{currentTopic.title || 'Documento sin título'}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Import Word Document Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md disabled:opacity-50"
            title="Sube un archivo .docx de Microsoft Word y copia su formato automáticamente"
          >
            {isImporting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <FileUp size={16} />
            )}
            <span>{isImporting ? 'Importando Word...' : 'Importar Word (.docx)'}</span>
          </button>

          <button
            onClick={() => onSaveTopic(currentTopic)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#22c55e]/20"
          >
            <Save size={16} />
            <span>Guardar Documento</span>
          </button>
        </div>
      </div>

      {/* Word Toolbar Ribbon */}
      <div className="bg-[#222222] border-b border-white/10 p-2.5 flex items-center justify-center flex-wrap gap-2 text-xs select-none shrink-0 shadow-inner">
        {/* Font Size & Type Selector */}
        <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/10">
          <Type size={14} className="text-[#22c55e] ml-1" />
          <select
            value={activeBlock?.style?.fontSize || 'base'}
            onChange={(e) => updateActiveStyle({ fontSize: e.target.value as any })}
            className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer pr-1"
          >
            <option value="xs" className="bg-[#222]">Texto Muy Pequeño</option>
            <option value="sm" className="bg-[#222]">Texto Pequeño</option>
            <option value="base" className="bg-[#222]">Texto Normal (base)</option>
            <option value="lg" className="bg-[#222]">Subtítulo Mediano (lg)</option>
            <option value="xl" className="bg-[#222]">Encabezado Grande (xl)</option>
            <option value="2xl" className="bg-[#222]">Título 2xl</option>
            <option value="3xl" className="bg-[#222]">Título 3xl</option>
            <option value="4xl" className="bg-[#222]">Título Principal 4xl</option>
          </select>
        </div>

        {/* Text Styling Group */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => updateActiveStyle({ bold: !activeBlock?.style?.bold })}
            className={`p-1.5 rounded-lg transition-colors ${
              activeBlock?.style?.bold ? 'bg-[#22c55e] text-black font-bold' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Negrita"
          >
            <Bold size={15} />
          </button>
          <button
            onClick={() => updateActiveStyle({ italic: !activeBlock?.style?.italic })}
            className={`p-1.5 rounded-lg transition-colors ${
              activeBlock?.style?.italic ? 'bg-[#22c55e] text-black font-bold' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Cursiva"
          >
            <Italic size={15} />
          </button>
          <button
            onClick={() => updateActiveStyle({ underline: !activeBlock?.style?.underline })}
            className={`p-1.5 rounded-lg transition-colors ${
              activeBlock?.style?.underline ? 'bg-[#22c55e] text-black font-bold' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Subrayado"
          >
            <Underline size={15} />
          </button>
          <button
            onClick={() => updateActiveStyle({ highlight: !activeBlock?.style?.highlight })}
            className={`p-1.5 rounded-lg transition-colors ${
              activeBlock?.style?.highlight ? 'bg-yellow-400 text-black font-bold' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Resaltador Amarillo"
          >
            <Highlighter size={15} />
          </button>
        </div>

        {/* Alignment Group */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => updateActiveStyle({ textAlign: 'left' })}
            className={`p-1.5 rounded-lg transition-colors ${
              activeBlock?.style?.textAlign === 'left' ? 'bg-[#22c55e] text-black' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Alinear Izquierda"
          >
            <AlignLeft size={15} />
          </button>
          <button
            onClick={() => updateActiveStyle({ textAlign: 'center' })}
            className={`p-1.5 rounded-lg transition-colors ${
              activeBlock?.style?.textAlign === 'center' ? 'bg-[#22c55e] text-black' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Centrar"
          >
            <AlignCenter size={15} />
          </button>
          <button
            onClick={() => updateActiveStyle({ textAlign: 'right' })}
            className={`p-1.5 rounded-lg transition-colors ${
              activeBlock?.style?.textAlign === 'right' ? 'bg-[#22c55e] text-black' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Alinear Derecha"
          >
            <AlignRight size={15} />
          </button>
          <button
            onClick={() => updateActiveStyle({ textAlign: 'justify' })}
            className={`p-1.5 rounded-lg transition-colors ${
              activeBlock?.style?.textAlign === 'justify' ? 'bg-[#22c55e] text-black' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Justificar"
          >
            <AlignJustify size={15} />
          </button>
        </div>

        {/* Insert Elements Ribbon */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => addBlock('heading')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 transition-colors"
          >
            <Heading size={14} className="text-[#22c55e]" />
            <span>Encabezado</span>
          </button>
          <button
            onClick={() => addBlock('paragraph')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 transition-colors"
          >
            <AlignLeft size={14} className="text-[#22c55e]" />
            <span>Párrafo</span>
          </button>
          <button
            onClick={() => addBlock('quote')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 transition-colors"
          >
            <Quote size={14} className="text-[#22c55e]" />
            <span>Cita Bíblica</span>
          </button>
          <button
            onClick={() => addBlock('image')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 transition-colors"
          >
            <ImageIcon size={14} className="text-[#22c55e]" />
            <span>Imagen</span>
          </button>
          <button
            onClick={() => addBlock('list')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 transition-colors"
          >
            <List size={14} className="text-[#22c55e]" />
            <span>Lista</span>
          </button>
        </div>
      </div>

      {/* Main Workspace - Word Page Sheet View */}
      <div className="flex-1 bg-[#181818] overflow-y-auto p-4 md:p-10 flex justify-center scroll-smooth">
        <div className="w-full max-w-4xl bg-[#f5f4f3] text-black shadow-2xl rounded-2xl min-h-[900px] p-6 md:p-16 border border-black/10 relative transition-all">

          <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="60px" />

          {/* Subtitle Header Input */}
          <div className="text-center mb-6">
            <input
              type="text"
              value={currentTopic.subtitle || ''}
              onChange={(e) => handleSubtitleChange(e.target.value)}
              className="w-full text-center bg-transparent text-[11px] md:text-xs uppercase tracking-widest text-black/50 font-bold focus:outline-none focus:bg-black/5 rounded py-1"
              placeholder="ENCABEZADO / SUBTÍTULO DEL DOCUMENTO..."
            />
          </div>

          {/* Inline Document Canvas Blocks */}
          <div className="space-y-4">
            {currentTopic.blocks.map((block, index) => {
              const isSelected = selectedBlockId === block.id;

              const fontClasses = {
                xs: 'text-xs',
                sm: 'text-sm',
                base: 'text-base',
                lg: 'text-lg',
                xl: 'text-xl',
                '2xl': 'text-2xl',
                '3xl': 'text-3xl',
                '4xl': 'text-4xl',
                '5xl': 'text-5xl',
                '6xl': 'text-6xl',
              }[block.style?.fontSize || 'base'];

              const alignClasses = {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right',
                justify: 'text-justify',
              }[block.style?.textAlign || 'left'];

              const weightClass = block.style?.bold ? 'font-bold' : 'font-normal';
              const italicClass = block.style?.italic ? 'italic' : '';
              const underlineClass = block.style?.underline ? 'underline underline-offset-4' : '';
              const highlightClass = block.style?.highlight ? 'bg-yellow-200/80 px-1 rounded-sm' : '';

              return (
                <div
                  key={block.id}
                  onClick={() => setSelectedBlockId(block.id)}
                  className={`relative group rounded-xl p-3 transition-all ${
                    isSelected
                      ? 'ring-2 ring-[#22c55e] bg-white shadow-md'
                      : 'hover:bg-black/[0.02]'
                  }`}
                >
                  {/* Floating Action Bar on Select */}
                  {isSelected && (
                    <div className="absolute -top-3 right-3 bg-black text-white px-2 py-1 rounded-lg text-[10px] font-mono flex items-center gap-2 shadow-lg z-20">
                      <span>Bloque {index + 1} ({block.type})</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlock(index, 'up');
                        }}
                        disabled={index === 0}
                        className="hover:text-[#22c55e] disabled:opacity-30"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlock(index, 'down');
                        }}
                        disabled={index === currentTopic.blocks.length - 1}
                        className="hover:text-[#22c55e] disabled:opacity-30"
                      >
                        <ChevronDown size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBlock(block.id);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}

                  {/* Heading Block */}
                  {block.type === 'heading' && (
                    <textarea
                      rows={1}
                      value={block.text || ''}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      className={`w-full bg-transparent resize-none focus:outline-none uppercase tracking-tight ${fontClasses} ${alignClasses} ${weightClass} ${italicClass} ${underlineClass} ${highlightClass}`}
                      placeholder="Escribe el título aquí..."
                    />
                  )}

                  {/* Paragraph Block */}
                  {block.type === 'paragraph' && (
                    <textarea
                      rows={3}
                      value={block.text || ''}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      className={`w-full bg-transparent resize-none focus:outline-none leading-relaxed text-black/80 ${fontClasses} ${alignClasses} ${weightClass} ${italicClass} ${underlineClass} ${highlightClass}`}
                      placeholder="Escribe el párrafo aquí..."
                    />
                  )}

                  {/* Biblical Quote Block */}
                  {block.type === 'quote' && (
                    <div className="pl-4 border-l-2 border-black/20 space-y-2 py-1">
                      <textarea
                        rows={2}
                        value={block.quoteText || ''}
                        onChange={(e) => updateBlock(block.id, { quoteText: e.target.value })}
                        className="w-full bg-transparent resize-none focus:outline-none font-bold text-base md:text-lg text-black"
                        placeholder="“Escribe la cita o versículo bíblico...”"
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={block.quoteReference || ''}
                          onChange={(e) => updateBlock(block.id, { quoteReference: e.target.value })}
                          className="bg-transparent text-xs opacity-70 border-b border-black/10 focus:outline-none focus:border-black font-semibold"
                          placeholder="Referencia (ej: Juan 3:16)"
                        />
                        <input
                          type="text"
                          value={block.quoteUrl || ''}
                          onChange={(e) => updateBlock(block.id, { quoteUrl: e.target.value })}
                          className="bg-transparent text-xs text-blue-600 border-b border-black/10 focus:outline-none focus:border-blue-600"
                          placeholder="URL del versículo..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Image Block */}
                  {block.type === 'image' && (
                    <div className="flex flex-col items-center space-y-2">
                      {block.imageUrl ? (
                        <div className="relative w-full max-w-lg h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
                          <img src={block.imageUrl} alt={block.imageAlt || 'Imagen'} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-full h-40 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-xs uppercase">
                          Imagen sin URL
                        </div>
                      )}
                      <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <input
                          type="text"
                          value={block.imageUrl || ''}
                          onChange={(e) => updateBlock(block.id, { imageUrl: e.target.value })}
                          className="bg-white border border-black/10 rounded-lg p-2 text-xs focus:outline-none focus:border-black"
                          placeholder="URL de la imagen..."
                        />
                        <input
                          type="text"
                          value={block.imageAlt || ''}
                          onChange={(e) => updateBlock(block.id, { imageAlt: e.target.value })}
                          className="bg-white border border-black/10 rounded-lg p-2 text-xs focus:outline-none focus:border-black"
                          placeholder="Pie de foto..."
                        />
                      </div>
                    </div>
                  )}

                  {/* List Block */}
                  {block.type === 'list' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
                        <span>Lista:</span>
                        <button
                          onClick={() => updateBlock(block.id, { listType: 'bullet' })}
                          className={`px-2 py-0.5 rounded ${block.listType === 'bullet' ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                          Viñetas
                        </button>
                        <button
                          onClick={() => updateBlock(block.id, { listType: 'number' })}
                          className={`px-2 py-0.5 rounded ${block.listType === 'number' ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                          Numerada
                        </button>
                      </div>

                      <div className="space-y-1 ml-4">
                        {(block.items || []).map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-2">
                            <span className="text-xs font-bold">{block.listType === 'number' ? `${itemIdx + 1}.` : '•'}</span>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newItems = [...(block.items || [])];
                                newItems[itemIdx] = e.target.value;
                                updateBlock(block.id, { items: newItems });
                              }}
                              className="flex-1 bg-transparent border-b border-black/10 text-sm focus:outline-none focus:border-black"
                            />
                            <button
                              onClick={() => {
                                const newItems = (block.items || []).filter((_, i) => i !== itemIdx);
                                updateBlock(block.id, { items: newItems });
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => updateBlock(block.id, { items: [...(block.items || []), 'Nuevo punto'] })}
                          className="text-xs text-blue-600 font-bold hover:underline mt-1 flex items-center gap-1"
                        >
                          <Plus size={12} /> Agregar elemento
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-6 border-t border-black/10 flex justify-center">
            <button
              onClick={() => addBlock('paragraph')}
              className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <Plus size={14} />
              <span>Añadir Párrafo al Documento</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

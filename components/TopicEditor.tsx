'use client';

import React, { useState } from 'react';
import { Course, Topic, ContentBlock } from '@/lib/coursesStore';
import { CourseTopicPreview } from './CourseTopicPreview';
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
  ListOrdered,
  Link as LinkIcon,
  Eye,
  Columns,
  Edit3,
  Save,
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'editor' | 'split' | 'preview'>('split');

  const handleTitleChange = (val: string) => {
    setCurrentTopic((prev) => ({ ...prev, title: val }));
  };

  const handleSubtitleChange = (val: string) => {
    setCurrentTopic((prev) => ({ ...prev, subtitle: val }));
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: 'block-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      type,
      text: type === 'heading' ? 'Nuevo Título de Sección' : type === 'paragraph' ? 'Escribe aquí tu texto...' : '',
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
  };

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setCurrentTopic((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)),
    }));
  };

  const updateBlockStyle = (blockId: string, styleUpdates: Partial<NonNullable<ContentBlock['style']>>) => {
    setCurrentTopic((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => {
        if (b.id !== blockId) return b;
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

  const removeBlock = (blockId: string) => {
    setCurrentTopic((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== blockId),
    }));
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

  const handleSave = () => {
    onSaveTopic(currentTopic);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 bg-[#141414] border-b border-white/10 shrink-0 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-[10px] text-[#22c55e] font-mono uppercase tracking-widest block">
              Editando Curso: {course.title}
            </span>
            <h2 className="text-lg font-bold text-white uppercase">{currentTopic.title || 'Sin Título'}</h2>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'editor' ? 'bg-[#22c55e] text-black shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Edit3 size={14} />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('split')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'split' ? 'bg-[#22c55e] text-black shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Columns size={14} />
            <span>Vista Dividida</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'preview' ? 'bg-[#22c55e] text-black shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye size={14} />
            <span>Previsualización</span>
          </button>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#22c55e]/20"
        >
          <Save size={16} />
          <span>Guardar Cambios</span>
        </button>
      </div>

      {/* Editor & Preview Split Workspace */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Column: Rich Editor Workspace */}
        {(activeTab === 'editor' || activeTab === 'split') && (
          <div
            className={`${
              activeTab === 'split' ? 'md:col-span-6 border-r border-white/10' : 'md:col-span-12'
            } p-4 md:p-6 overflow-y-auto space-y-6 bg-[#0a0a0a]`}
          >
            {/* Metadata Section */}
            <div className="p-4 bg-[#141414] border border-white/10 rounded-2xl space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold">
                Datos del Tema / Subpágina
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Título del Tema</label>
                  <input
                    type="text"
                    value={currentTopic.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#22c55e]"
                    placeholder="Ej: I. La Deidad de Cristo"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Subtítulo / Encabezado Corto</label>
                  <input
                    type="text"
                    value={currentTopic.subtitle || ''}
                    onChange={(e) => handleSubtitleChange(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#22c55e]"
                    placeholder="Ej: I. LA DEIDAD DE CRISTO - CRISTOLOGÍA"
                  />
                </div>
              </div>
            </div>

            {/* Add Content Block Action Bar */}
            <div className="p-4 bg-[#141414] border border-white/10 rounded-2xl">
              <h3 className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold mb-3">
                Insertar Contenido
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addBlock('heading')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-200 transition-colors"
                >
                  <Heading size={14} className="text-[#22c55e]" />
                  <span>Encabezado</span>
                </button>
                <button
                  onClick={() => addBlock('paragraph')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-200 transition-colors"
                >
                  <AlignLeft size={14} className="text-[#22c55e]" />
                  <span>Párrafo</span>
                </button>
                <button
                  onClick={() => addBlock('quote')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-200 transition-colors"
                >
                  <Quote size={14} className="text-[#22c55e]" />
                  <span>Cita Bíblica</span>
                </button>
                <button
                  onClick={() => addBlock('image')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-200 transition-colors"
                >
                  <ImageIcon size={14} className="text-[#22c55e]" />
                  <span>Imagen</span>
                </button>
                <button
                  onClick={() => addBlock('list')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-200 transition-colors"
                >
                  <List size={14} className="text-[#22c55e]" />
                  <span>Lista</span>
                </button>
                <button
                  onClick={() => addBlock('link')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-200 transition-colors"
                >
                  <LinkIcon size={14} className="text-[#22c55e]" />
                  <span>Enlace</span>
                </button>
              </div>
            </div>

            {/* List of Editable Content Blocks */}
            <div className="space-y-4">
              {currentTopic.blocks.length === 0 ? (
                <div className="p-8 text-center bg-[#141414] border border-dashed border-white/10 rounded-2xl text-gray-500 text-xs">
                  Aún no hay bloques de contenido. Usa la barra superior para agregar títulos, párrafos o citas.
                </div>
              ) : (
                currentTopic.blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="p-4 bg-[#141414] border border-white/10 rounded-2xl space-y-3 relative group"
                  >
                    {/* Block Toolbar */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 flex-wrap gap-2">
                      <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-wider font-bold">
                        Bloque {index + 1}: {block.type}
                      </span>

                      <div className="flex items-center gap-1">
                        {/* Style Formatting Options for Text Blocks */}
                        {(block.type === 'heading' || block.type === 'paragraph') && (
                          <div className="flex items-center gap-1 mr-2 bg-black/40 p-1 rounded-lg border border-white/5">
                            {/* Font Size Select */}
                            <select
                              value={block.style?.fontSize || 'base'}
                              onChange={(e) =>
                                updateBlockStyle(block.id, {
                                  fontSize: e.target.value as any,
                                })
                              }
                              className="bg-transparent text-gray-300 text-xs focus:outline-none cursor-pointer pr-1"
                            >
                              <option value="xs" className="bg-[#141414]">Muy Pequeño (xs)</option>
                              <option value="sm" className="bg-[#141414]">Pequeño (sm)</option>
                              <option value="base" className="bg-[#141414]">Normal (base)</option>
                              <option value="lg" className="bg-[#141414]">Mediano (lg)</option>
                              <option value="xl" className="bg-[#141414]">Grande (xl)</option>
                              <option value="2xl" className="bg-[#141414]">Muy Grande (2xl)</option>
                              <option value="3xl" className="bg-[#141414]">Título 3xl</option>
                              <option value="4xl" className="bg-[#141414]">Título 4xl</option>
                            </select>

                            <button
                              onClick={() =>
                                updateBlockStyle(block.id, { bold: !block.style?.bold })
                              }
                              className={`p-1 rounded hover:bg-white/10 ${
                                block.style?.bold ? 'text-[#22c55e]' : 'text-gray-400'
                              }`}
                              title="Negrita"
                            >
                              <Bold size={13} />
                            </button>

                            <button
                              onClick={() =>
                                updateBlockStyle(block.id, { italic: !block.style?.italic })
                              }
                              className={`p-1 rounded hover:bg-white/10 ${
                                block.style?.italic ? 'text-[#22c55e]' : 'text-gray-400'
                              }`}
                              title="Cursiva"
                            >
                              <Italic size={13} />
                            </button>

                            <button
                              onClick={() =>
                                updateBlockStyle(block.id, { underline: !block.style?.underline })
                              }
                              className={`p-1 rounded hover:bg-white/10 ${
                                block.style?.underline ? 'text-[#22c55e]' : 'text-gray-400'
                              }`}
                              title="Subrayado"
                            >
                              <Underline size={13} />
                            </button>

                            <button
                              onClick={() =>
                                updateBlockStyle(block.id, { highlight: !block.style?.highlight })
                              }
                              className={`p-1 rounded hover:bg-white/10 ${
                                block.style?.highlight ? 'text-yellow-400 font-bold' : 'text-gray-400'
                              }`}
                              title="Resaltado Amarillo"
                            >
                              <Highlighter size={13} />
                            </button>

                            <span className="w-px h-3 bg-white/10 mx-0.5" />

                            <button
                              onClick={() => updateBlockStyle(block.id, { textAlign: 'left' })}
                              className={`p-1 rounded hover:bg-white/10 ${
                                block.style?.textAlign === 'left' ? 'text-[#22c55e]' : 'text-gray-400'
                              }`}
                            >
                              <AlignLeft size={13} />
                            </button>
                            <button
                              onClick={() => updateBlockStyle(block.id, { textAlign: 'center' })}
                              className={`p-1 rounded hover:bg-white/10 ${
                                block.style?.textAlign === 'center' ? 'text-[#22c55e]' : 'text-gray-400'
                              }`}
                            >
                              <AlignCenter size={13} />
                            </button>
                            <button
                              onClick={() => updateBlockStyle(block.id, { textAlign: 'right' })}
                              className={`p-1 rounded hover:bg-white/10 ${
                                block.style?.textAlign === 'right' ? 'text-[#22c55e]' : 'text-gray-400'
                              }`}
                            >
                              <AlignRight size={13} />
                            </button>
                            <button
                              onClick={() => updateBlockStyle(block.id, { textAlign: 'justify' })}
                              className={`p-1 rounded hover:bg-white/10 ${
                                block.style?.textAlign === 'justify' ? 'text-[#22c55e]' : 'text-gray-400'
                              }`}
                            >
                              <AlignJustify size={13} />
                            </button>
                          </div>
                        )}

                        {/* Move Up/Down Controls */}
                        <button
                          onClick={() => moveBlock(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                          title="Mover arriba"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => moveBlock(index, 'down')}
                          disabled={index === currentTopic.blocks.length - 1}
                          className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                          title="Mover abajo"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          onClick={() => removeBlock(block.id)}
                          className="p-1 text-red-400 hover:text-red-300 ml-1"
                          title="Eliminar bloque"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Block Fields */}
                    {block.type === 'heading' && (
                      <div>
                        <input
                          type="text"
                          value={block.text || ''}
                          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#22c55e] font-bold"
                          placeholder="Texto del encabezado..."
                        />
                      </div>
                    )}

                    {block.type === 'paragraph' && (
                      <div>
                        <textarea
                          rows={4}
                          value={block.text || ''}
                          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#22c55e]"
                          placeholder="Texto del párrafo..."
                        />
                      </div>
                    )}

                    {block.type === 'quote' && (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase">
                            Texto de la Cita / Versículo
                          </label>
                          <textarea
                            rows={2}
                            value={block.quoteText || ''}
                            onChange={(e) => updateBlock(block.id, { quoteText: e.target.value })}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#22c55e]"
                            placeholder="“Porque de tal manera amó Dios al mundo...”"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-gray-400 uppercase">
                              Referencia (Pasaje)
                            </label>
                            <input
                              type="text"
                              value={block.quoteReference || ''}
                              onChange={(e) => updateBlock(block.id, { quoteReference: e.target.value })}
                              className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                              placeholder="Juan 3:16 (Reina-Valera 1960)"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 uppercase">
                              Enlace del Versículo (BibleGateway, etc)
                            </label>
                            <input
                              type="text"
                              value={block.quoteUrl || ''}
                              onChange={(e) => updateBlock(block.id, { quoteUrl: e.target.value })}
                              className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase">
                            URL de la Imagen
                          </label>
                          <input
                            type="text"
                            value={block.imageUrl || ''}
                            onChange={(e) => updateBlock(block.id, { imageUrl: e.target.value })}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                            placeholder="https://images.unsplash.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase">
                            Descripción / Pie de foto
                          </label>
                          <input
                            type="text"
                            value={block.imageAlt || ''}
                            onChange={(e) => updateBlock(block.id, { imageAlt: e.target.value })}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                            placeholder="Descripción opcional"
                          />
                        </div>
                      </div>
                    )}

                    {block.type === 'list' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                          <label className="text-[10px] text-gray-400 uppercase">Tipo de Lista:</label>
                          <button
                            onClick={() => updateBlock(block.id, { listType: 'bullet' })}
                            className={`px-2 py-0.5 rounded text-xs ${
                              block.listType === 'bullet'
                                ? 'bg-[#22c55e] text-black font-bold'
                                : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            Viñetas (•)
                          </button>
                          <button
                            onClick={() => updateBlock(block.id, { listType: 'number' })}
                            className={`px-2 py-0.5 rounded text-xs ${
                              block.listType === 'number'
                                ? 'bg-[#22c55e] text-black font-bold'
                                : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            Numerada (1, 2, 3)
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          {(block.items || []).map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{itemIdx + 1}.</span>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const newItems = [...(block.items || [])];
                                  newItems[itemIdx] = e.target.value;
                                  updateBlock(block.id, { items: newItems });
                                }}
                                className="flex-1 bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                              />
                              <button
                                onClick={() => {
                                  const newItems = (block.items || []).filter((_, i) => i !== itemIdx);
                                  updateBlock(block.id, { items: newItems });
                                }}
                                className="p-1 text-red-400 hover:text-red-300"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              updateBlock(block.id, {
                                items: [...(block.items || []), 'Nuevo elemento'],
                              });
                            }}
                            className="flex items-center gap-1 text-xs text-[#22c55e] hover:underline mt-1 font-medium"
                          >
                            <Plus size={12} />
                            <span>Agregar elemento a la lista</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {block.type === 'link' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase">
                            Texto del Enlace
                          </label>
                          <input
                            type="text"
                            value={block.linkText || ''}
                            onChange={(e) => updateBlock(block.id, { linkText: e.target.value })}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                            placeholder="Ej: Ver Estudio Bíblico"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase">
                            URL / Enlace
                          </label>
                          <input
                            type="text"
                            value={block.linkUrl || ''}
                            onChange={(e) => updateBlock(block.id, { linkUrl: e.target.value })}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Right Column: Live Word-like Preview Pane */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div
            className={`${
              activeTab === 'split' ? 'md:col-span-6' : 'md:col-span-12'
            } p-4 md:p-6 bg-[#000000] overflow-y-auto flex flex-col`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-widest text-[#22c55e] font-bold flex items-center gap-1.5">
                <Eye size={14} /> Vista Previa en Tiempo Real
              </span>
              <span className="text-[10px] text-gray-500">
                Plantilla idéntica a la vista del usuario
              </span>
            </div>

            <CourseTopicPreview
              title={currentTopic.title}
              subtitle={currentTopic.subtitle}
              blocks={currentTopic.blocks}
              currentSlug={course.slug}
            />
          </div>
        )}
      </div>
    </div>
  );
}

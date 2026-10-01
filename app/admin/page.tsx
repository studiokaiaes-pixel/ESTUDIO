'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth, logoutAdmin } from '@/lib/auth';
import { useCoursesStore, Course, Topic, CourseResource } from '@/lib/coursesStore';
import { TopicEditor } from '@/components/TopicEditor';
import {
  LogOut,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  FileText,
  Home,
  Layers,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { authenticated } = useAdminAuth();
  const { courses, isLoaded, updateCourse, addCourse, deleteCourse, resetToDefault } = useCoursesStore();

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // New Course Modal / State
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState<'disponible' | 'proximamente'>('disponible');
  const [newCourseType, setNewCourseType] = useState('CURSO');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseImage, setNewCourseImage] = useState('https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=400&h=600&fit=crop');

  // Course Edit Modal / State
  const [editingCourseMeta, setEditingCourseMeta] = useState<Course | null>(null);

  // Resource Edit State
  const [newResTitle, setNewResTitle] = useState('');
  const [newResUrl, setNewResUrl] = useState('');

  useEffect(() => {
    if (authenticated === false) {
      router.push('/admin/login');
    }
  }, [authenticated, router]);

  if (authenticated === null || !isLoaded) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-gray-400">Cargando Panel...</span>
        </div>
      </div>
    );
  }

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const selectedTopic = selectedCourse?.topics.find((t) => t.id === selectedTopicId);

  // Helper slug generator
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const slug = slugify(newCourseTitle);
    const created: Course = {
      id: slug,
      slug,
      title: newCourseTitle.toUpperCase(),
      subtitle: `Enseñanza Bíblica de ${newCourseTitle}`,
      description: newCourseDesc || 'Descripción del curso',
      type: newCourseType,
      category: newCourseCategory,
      imageSrc: newCourseImage,
      status: 'completed',
      topics: [
        {
          id: 'introduccion',
          slug: 'introduccion',
          title: 'Introducción',
          subtitle: `INTRODUCCIÓN ${newCourseTitle.toUpperCase()}`,
          order: 1,
          blocks: [
            {
              id: 'b-init-1',
              type: 'heading',
              text: `Introducción a ${newCourseTitle}`,
              style: { fontSize: '3xl', bold: true, textAlign: 'center' },
            },
            {
              id: 'b-init-2',
              type: 'paragraph',
              text: 'Bienvenido a este módulo de enseñanza bíblica. Edita este texto desde el panel de administración.',
              style: { fontSize: 'base' },
            },
          ],
        },
      ],
      resources: [],
    };

    addCourse(created);
    setSelectedCourseId(created.id);
    setIsAddingCourse(false);
    setNewCourseTitle('');
    setNewCourseDesc('');
  };

  const handleAddTopicToCourse = () => {
    if (!selectedCourse) return;
    const topicCount = selectedCourse.topics.length + 1;
    const newTopicTitle = `Nuevo Tema ${topicCount}`;
    const newTopicSlug = `tema-${Date.now()}`;

    const newTopic: Topic = {
      id: newTopicSlug,
      slug: newTopicSlug,
      title: newTopicTitle,
      subtitle: `${newTopicTitle.toUpperCase()} - ${selectedCourse.title}`,
      order: topicCount,
      blocks: [
        {
          id: 'b-t-' + Date.now(),
          type: 'heading',
          text: newTopicTitle,
          style: { fontSize: '3xl', bold: true, textAlign: 'center' },
        },
        {
          id: 'b-p-' + Date.now(),
          type: 'paragraph',
          text: 'Escribe aquí el contenido del tema...',
          style: { fontSize: 'base' },
        },
      ],
    };

    const updatedCourse: Course = {
      ...selectedCourse,
      topics: [...selectedCourse.topics, newTopic],
    };

    updateCourse(updatedCourse);
    setSelectedTopicId(newTopic.id);
  };

  const handleSaveTopic = (updatedTopic: Topic) => {
    if (!selectedCourse) return;
    const newTopics = selectedCourse.topics.map((t) => (t.id === updatedTopic.id ? updatedTopic : t));
    const updatedCourse: Course = {
      ...selectedCourse,
      topics: newTopics,
    };
    updateCourse(updatedCourse);
    setSelectedTopicId(null);
  };

  const handleDeleteTopic = (topicId: string) => {
    if (!selectedCourse) return;
    if (!confirm('¿Estás seguro de eliminar este tema del curso?')) return;
    const newTopics = selectedCourse.topics.filter((t) => t.id !== topicId);
    updateCourse({ ...selectedCourse, topics: newTopics });
  };

  const handleAddResource = () => {
    if (!selectedCourse || !newResTitle.trim() || !newResUrl.trim()) return;
    const newRes: CourseResource = {
      id: 'res-' + Date.now(),
      title: newResTitle,
      type: 'Documento PDF / Enlace',
      url: newResUrl,
      imageUrl: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=200&h=120&fit=crop',
    };
    const updatedCourse: Course = {
      ...selectedCourse,
      resources: [...(selectedCourse.resources || []), newRes],
    };
    updateCourse(updatedCourse);
    setNewResTitle('');
    setNewResUrl('');
  };

  const handleDeleteResource = (resId: string) => {
    if (!selectedCourse) return;
    const updatedCourse: Course = {
      ...selectedCourse,
      resources: (selectedCourse.resources || []).filter((r) => r.id !== resId),
    };
    updateCourse(updatedCourse);
  };

  const handleSaveCourseMeta = () => {
    if (!editingCourseMeta) return;
    updateCourse(editingCourseMeta);
    setEditingCourseMeta(null);
  };

  // If currently editing a topic, render full Topic Editor component
  if (selectedTopic && selectedCourse) {
    return (
      <TopicEditor
        course={selectedCourse}
        topic={selectedTopic}
        onSaveTopic={handleSaveTopic}
        onBack={() => setSelectedTopicId(null)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#22c55e] selection:text-black">
      {/* Top Navbar */}
      <header className="py-4 px-6 bg-[#111111] border-b border-white/10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold">
            KB
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight uppercase">Panel Admin - Cursos</h1>
            <span className="text-[10px] text-gray-400">Usuario: <strong className="text-[#22c55e]">kbbarbosa</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('¿Deseas restaurar los cursos y temas a su estado inicial original?')) {
                resetToDefault();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
            title="Restaurar contenido original"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Restaurar Todo</span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Ver Sitio</span>
          </Link>

          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 transition-colors"
          >
            <LogOut size={14} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 max-w-7xl w-full mx-auto p-4 md:p-8 gap-6">

        {/* Left Column: Course Selector & Management */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold flex items-center gap-2">
              <BookOpen size={16} className="text-[#22c55e]" />
              Mis Cursos
            </h2>
            <button
              onClick={() => setIsAddingCourse(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs rounded-xl transition-all shadow-md"
            >
              <Plus size={14} />
              <span>Nuevo Curso</span>
            </button>
          </div>

          {/* List of Courses */}
          <div className="space-y-3">
            {courses.map((course) => {
              const isSelected = selectedCourse?.id === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#141414] border-[#22c55e] shadow-lg shadow-[#22c55e]/10'
                      : 'bg-[#0f0f0f] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                      <img src={course.imageSrc} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="truncate">
                      <h3 className="font-bold text-sm text-white truncate uppercase">{course.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400 font-mono uppercase">
                          {course.topics.length} {course.topics.length === 1 ? 'tema' : 'temas'}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          course.category === 'disponible' ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {course.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCourseMeta(course);
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                      title="Editar datos del curso"
                    >
                      <Edit size={14} />
                    </button>
                    {courses.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`¿Eliminar definitivamente el curso ${course.title}?`)) {
                            deleteCourse(course.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        title="Eliminar curso"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Course Topics & Material Editor */}
        <div className="md:col-span-8 space-y-6">
          {selectedCourse && (
            <>
              {/* Course Header Banner */}
              <div className="p-6 bg-[#111111] border border-white/10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-widest font-bold">
                      Curso Seleccionado
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">ID: {selectedCourse.slug}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/ensenanzas/${selectedCourse.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all"
                  >
                    <span>Ver Página Pública</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </div>

              {/* Topics / Pages inside this Course */}
              <div className="p-6 bg-[#111111] border border-white/10 rounded-3xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm uppercase font-bold tracking-wider text-white flex items-center gap-2">
                      <Layers size={18} className="text-[#22c55e]" />
                      Índice y Temas del Curso
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Haz clic en un tema para modificar sus párrafos, textos, formato y citas bíblicas.
                    </p>
                  </div>

                  <button
                    onClick={handleAddTopicToCourse}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs rounded-xl transition-all shadow-md"
                  >
                    <Plus size={14} />
                    <span>Agregar Nuevo Tema</span>
                  </button>
                </div>

                {/* Topic Cards */}
                <div className="grid grid-cols-1 gap-3">
                  {selectedCourse.topics.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl text-gray-500 text-xs">
                      Este curso no tiene temas. Haz clic en "Agregar Nuevo Tema" para empezar.
                    </div>
                  ) : (
                    selectedCourse.topics.map((topic, index) => (
                      <div
                        key={topic.id}
                        className="p-4 rounded-2xl bg-[#181818] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-4 overflow-hidden">
                          <span className="w-8 h-8 rounded-xl bg-white/5 text-[#22c55e] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <div className="truncate">
                            <h4 className="font-bold text-sm text-white uppercase truncate">{topic.title}</h4>
                            <span className="text-[11px] text-gray-400 block truncate">
                              {topic.blocks.length} {topic.blocks.length === 1 ? 'bloque de contenido' : 'bloques de contenido'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setSelectedTopicId(topic.id)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs rounded-xl transition-all"
                          >
                            <Edit size={14} />
                            <span>Editar Contenido</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTopic(topic.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                            title="Eliminar tema"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Section for Material de Apoyo / Resources */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h3 className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold flex items-center gap-2">
                    <FileText size={16} className="text-[#22c55e]" />
                    Material de Apoyo (PDFs / Documentos)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(selectedCourse.resources || []).map((res) => (
                      <div
                        key={res.id}
                        className="p-3 rounded-2xl bg-[#181818] border border-white/5 flex items-center justify-between gap-2"
                      >
                        <div className="truncate">
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-white hover:text-[#22c55e] truncate block uppercase"
                          >
                            {res.title}
                          </a>
                          <span className="text-[10px] text-gray-500 font-mono block">{res.type}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteResource(res.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Resource Form */}
                  <div className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-gray-300 block uppercase">Agregar Nuevo PDF / Material</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Nombre del documento (ej: Apuntes Cristología)"
                        value={newResTitle}
                        onChange={(e) => setNewResTitle(e.target.value)}
                        className="bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                      />
                      <input
                        type="text"
                        placeholder="URL del PDF o Google Drive"
                        value={newResUrl}
                        onChange={(e) => setNewResUrl(e.target.value)}
                        className="bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                      />
                    </div>
                    <button
                      onClick={handleAddResource}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all"
                    >
                      Guardar Recurso
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal: Add New Course */}
      {isAddingCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 w-full max-w-lg space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-white uppercase">Crear Nuevo Curso / Material</h3>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase mb-1">Título del Curso</label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="Ej: NEUMATOLOGÍA"
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#22c55e]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase mb-1">Descripción Corta</label>
                <textarea
                  rows={3}
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  placeholder="Descripción resumida de qué trata la enseñanza..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#22c55e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 uppercase mb-1">Categoría</label>
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                  >
                    <option value="disponible">Cursos Disponibles</option>
                    <option value="proximamente">Próximamente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 uppercase mb-1">Etiqueta Tipo</label>
                  <input
                    type="text"
                    value={newCourseType}
                    onChange={(e) => setNewCourseType(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                    placeholder="CURSO"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase mb-1">URL de Imagen de Portada</label>
                <input
                  type="text"
                  value={newCourseImage}
                  onChange={(e) => setNewCourseImage(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCourse(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black text-xs font-bold shadow-lg"
                >
                  Crear Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Course Metadata */}
      {editingCourseMeta && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 w-full max-w-lg space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-white uppercase">Editar Datos de {editingCourseMeta.title}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase mb-1">Título</label>
                <input
                  type="text"
                  value={editingCourseMeta.title}
                  onChange={(e) => setEditingCourseMeta({ ...editingCourseMeta, title: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#22c55e]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase mb-1">Descripción</label>
                <textarea
                  rows={3}
                  value={editingCourseMeta.description}
                  onChange={(e) => setEditingCourseMeta({ ...editingCourseMeta, description: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#22c55e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 uppercase mb-1">Categoría</label>
                  <select
                    value={editingCourseMeta.category}
                    onChange={(e) => setEditingCourseMeta({ ...editingCourseMeta, category: e.target.value as any })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                  >
                    <option value="disponible">Cursos Disponibles</option>
                    <option value="proximamente">Próximamente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 uppercase mb-1">Imagen URL</label>
                  <input
                    type="text"
                    value={editingCourseMeta.imageSrc}
                    onChange={(e) => setEditingCourseMeta({ ...editingCourseMeta, imageSrc: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCourseMeta(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveCourseMeta}
                  className="px-5 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black text-xs font-bold shadow-lg"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

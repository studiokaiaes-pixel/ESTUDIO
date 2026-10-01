'use client';

import React from 'react';
import { ContentBlock } from '@/lib/coursesStore';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { QuickIndex } from '@/components/quick-index';

export function CourseTopicPreview({
  title,
  subtitle,
  blocks,
  currentSlug,
}: {
  title: string;
  subtitle?: string;
  blocks: ContentBlock[];
  currentSlug: string;
}) {
  return (
    <div className="bg-[#f5f4f3] text-black rounded-2xl shadow-xl overflow-hidden border border-black/10 min-h-[600px] relative">
      <div className="relative flex h-full w-full flex-col items-center bg-[#f5f4f3]">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" height="60px" />

        <div className="flex h-full w-full flex-col items-center overflow-y-auto pt-8 pb-20 px-4 md:px-8 scroll-smooth">
          {subtitle && (
            <div className="mt-4 grid content-start justify-items-center gap-2 text-center text-black">
              <span className="relative max-w-[25ch] text-[10px] md:text-xs uppercase leading-tight opacity-50 font-semibold tracking-wider">
                {subtitle}
              </span>
            </div>
          )}

          <div className="mt-6 w-full max-w-2xl space-y-6">
            {blocks.map((block) => (
              <RenderBlock key={block.id} block={block} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderBlock({ block }: { block: ContentBlock }) {
  const { type, text, quoteText, quoteReference, quoteUrl, imageUrl, imageAlt, listType, items, linkUrl, linkText, style } = block;

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
  }[style?.fontSize || 'base'];

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }[style?.textAlign || 'left'];

  const weightClass = style?.bold ? 'font-bold' : 'font-normal';
  const italicClass = style?.italic ? 'italic' : '';
  const underlineClass = style?.underline ? 'underline underline-offset-4' : '';
  const highlightClass = style?.highlight ? 'bg-yellow-200/80 px-1 rounded-sm' : '';

  if (type === 'heading') {
    return (
      <h2
        className={`${fontClasses} ${alignClasses} ${weightClass} ${italicClass} ${underlineClass} text-black tracking-tight uppercase leading-snug my-3`}
      >
        <span className={highlightClass}>{text}</span>
      </h2>
    );
  }

  if (type === 'paragraph') {
    return (
      <p className={`${fontClasses} ${alignClasses} ${weightClass} ${italicClass} ${underlineClass} text-black/80 leading-relaxed my-2`}>
        <span className={highlightClass}>{text}</span>
      </p>
    );
  }

  if (type === 'quote') {
    return (
      <div className="my-6 pl-4 border-l-2 border-black/20 space-y-2 py-1">
        <p className="font-bold text-base md:text-lg text-black">{quoteText}</p>
        {quoteReference && (
          <a
            href={quoteUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs opacity-60 hover:opacity-100 hover:text-blue-600 transition-all underline decoration-dotted underline-offset-2 block w-fit"
          >
            {quoteReference}
          </a>
        )}
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div className="my-6 flex flex-col items-center">
        {imageUrl ? (
          <div className="relative w-full max-w-lg h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
            <img src={imageUrl} alt={imageAlt || 'Imagen'} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-xs uppercase tracking-wider">
            Sin URL de imagen
          </div>
        )}
        {imageAlt && <span className="text-xs text-black/50 mt-2 italic">{imageAlt}</span>}
      </div>
    );
  }

  if (type === 'list') {
    if (listType === 'number') {
      return (
        <ol className="list-decimal ml-6 space-y-2 font-medium text-black/80 my-4 text-sm md:text-base">
          {items?.map((item, idx) => (
            <li key={idx}>
              <span className={highlightClass}>{item}</span>
            </li>
          ))}
        </ol>
      );
    }
    return (
      <ul className="list-disc ml-6 space-y-2 font-medium text-black/80 my-4 text-sm md:text-base">
        {items?.map((item, idx) => (
          <li key={idx}>
            <span className={highlightClass}>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (type === 'link') {
    return (
      <div className="my-3">
        <a
          href={linkUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium text-sm md:text-base"
        >
          {linkText || linkUrl || 'Enlace externo'}
        </a>
      </div>
    );
  }

  return null;
}

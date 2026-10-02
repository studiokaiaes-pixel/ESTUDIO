import mammoth from 'mammoth';
import { ContentBlock } from './coursesStore';

export async function parseWordDocument(arrayBuffer: ArrayBuffer): Promise<ContentBlock[]> {
  try {
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;

    if (typeof window === 'undefined') {
      return [];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const blocks: ContentBlock[] = [];

    const nodes = Array.from(doc.body.childNodes);

    nodes.forEach((node, idx) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node as HTMLElement;
      const tagName = el.tagName.toLowerCase();
      const text = el.textContent?.trim() || '';

      if (!text && !el.querySelector('img')) return;

      const blockId = `word-b-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`;

      // Check inline styling formatting
      const isBold = el.querySelector('strong, b') !== null || el.tagName === 'B' || el.tagName === 'STRONG';
      const isItalic = el.querySelector('em, i') !== null || el.tagName === 'I' || el.tagName === 'EM';
      const isUnderline = el.querySelector('u') !== null || el.tagName === 'U';
      const isHighlight = el.querySelector('mark') !== null || el.style.backgroundColor !== '';

      if (tagName.startsWith('h')) {
        blocks.push({
          id: blockId,
          type: 'heading',
          text,
          style: {
            fontSize: tagName === 'h1' ? '4xl' : tagName === 'h2' ? '3xl' : '2xl',
            bold: true,
            textAlign: 'left',
          },
        });
      } else if (tagName === 'blockquote') {
        blocks.push({
          id: blockId,
          type: 'quote',
          quoteText: `“${text}”`,
          quoteReference: 'Cita importada de Word',
        });
      } else if (tagName === 'ul' || tagName === 'ol') {
        const items = Array.from(el.querySelectorAll('li')).map((li) => li.textContent?.trim() || '');
        blocks.push({
          id: blockId,
          type: 'list',
          listType: tagName === 'ol' ? 'number' : 'bullet',
          items,
        });
      } else if (tagName === 'p') {
        // Check if paragraph contains quote marks
        if (text.startsWith('“') || text.startsWith('"') || text.startsWith('«')) {
          blocks.push({
            id: blockId,
            type: 'quote',
            quoteText: text,
            quoteReference: 'Versículo / Cita',
          });
        } else {
          blocks.push({
            id: blockId,
            type: 'paragraph',
            text,
            style: {
              fontSize: 'base',
              bold: isBold,
              italic: isItalic,
              underline: isUnderline,
              highlight: isHighlight,
              textAlign: 'left',
            },
          });
        }
      }
    });

    return blocks;
  } catch (err) {
    console.error('Error parsing Word document:', err);
    throw err;
  }
}

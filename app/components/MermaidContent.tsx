'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Segment = { type: 'markdown' | 'mermaid'; value: string };

function splitContent(content: string): Segment[] {
  // Accept three or more backticks. This also recovers CMS text that starts a
  // block with four backticks but closes it with the usual three.
  const pattern = /`{3,}mermaid[^\S\r\n]*\r?\n?([\s\S]*?)`{3,}/g;
  const segments: Segment[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(content))) {
    const before = content.slice(cursor, match.index).trim();
    if (before) segments.push({ type: 'markdown', value: before });
    segments.push({ type: 'mermaid', value: match[1].trim() });
    cursor = match.index + match[0].length;
  }

  const after = content.slice(cursor).trim();
  if (after) segments.push({ type: 'markdown', value: after });
  return segments.length ? segments : [{ type: 'markdown', value: content }];
}

function normalizeSource(source: string) {
  // Older CMS saves may have collapsed line breaks in sequence diagrams.
  return source.startsWith('sequenceDiagram')
    ? source.replace(/\s+(participant\s+)/g, '\n$1').replace(/\s+([A-Za-z][\w-]*->>)/g, '\n$1')
    : source;
}

export default function MermaidContent({ content }: { content: string }) {
  const [svgs, setSvgs] = useState<string[]>([]);
  const id = useId().replace(/:/g, '');
  const segments = useMemo(() => splitContent(content), [content]);
  const diagrams = useMemo(() => segments.filter((segment) => segment.type === 'mermaid'), [segments]);

  useEffect(() => {
    if (!diagrams.length) { setSvgs([]); return; }
    let cancelled = false;
    import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' });
      const rendered = await Promise.all(diagrams.map(async (diagram, index) => {
        const result = await mermaid.render(`diagram-${id}-${index}`, normalizeSource(diagram.value));
        return result.svg;
      }));
      if (!cancelled) setSvgs(rendered);
    }).catch(() => { if (!cancelled) setSvgs(diagrams.map(() => '<p>図を表示できませんでした。</p>')); });
    return () => { cancelled = true; };
  }, [diagrams, id]);

  let diagramIndex = 0;
  return <>{segments.map((segment, index) => {
    if (segment.type === 'markdown') return <ReactMarkdown key={`markdown-${index}`} remarkPlugins={[remarkGfm]}>{segment.value}</ReactMarkdown>;
    const svg = svgs[diagramIndex++] ?? '';
    return <div className="mermaid-diagram" key={`diagram-${index}`} dangerouslySetInnerHTML={{ __html: svg }} />;
  })}</>;
}

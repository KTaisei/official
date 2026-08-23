'use client';

import { useEffect, useId, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MermaidContent({ content }: { content: string }) {
  const [svg, setSvg] = useState('');
  const id = useId().replace(/:/g, '');
  const match = content.match(/```mermaid\s*([\s\S]*?)```/);
  const before = match ? content.slice(0, match.index).trim() : content;
  const after = match ? content.slice((match.index ?? 0) + match[0].length).trim() : '';

  useEffect(() => {
    if (!match) return;
    let cancelled = false;
    import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' });
      let source = match[1].trim();
      // Older CMS saves may have collapsed line breaks in Mermaid blocks.
      if (source.startsWith('sequenceDiagram')) {
        source = source.replace(/\s+(participant\s+)/g, '\n$1').replace(/\s+([A-Za-z][\w-]*->>)/g, '\n$1');
      }
      const result = await mermaid.render(`diagram-${id}`, source);
      if (!cancelled) setSvg(result.svg);
    }).catch(() => { if (!cancelled) setSvg('<p>図を表示できませんでした。</p>'); });
    return () => { cancelled = true; };
  }, [content, id, match]);

  const markdown = (value: string) => <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>;
  return <>{before && markdown(before)}{match && <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />}{after && markdown(after)}</>;
}

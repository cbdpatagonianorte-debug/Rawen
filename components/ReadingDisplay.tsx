
import React from 'react';

interface ReadingDisplayProps {
  reading: string;
}

// Simple markdown to HTML renderer
const renderMarkdown = (text: string) => {
    let html = text;
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-yellow-400">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 text-cyan-300">$1</h2>');
    // Paragraphs
    html = html.split('\n').map(p => p.trim() ? `<p class="mb-4">${p}</p>` : '').join('');
    return { __html: html };
};


export const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading }) => {
  return (
    <div className="prose prose-invert max-w-none font-serif text-slate-300 text-lg leading-relaxed space-y-4">
      <div dangerouslySetInnerHTML={renderMarkdown(reading)} />
    </div>
  );
};

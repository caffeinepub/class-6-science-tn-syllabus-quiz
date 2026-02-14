import { ReactNode } from 'react';

interface ReadingPanelProps {
  main: ReactNode;
  footnote?: ReactNode;
}

export default function ReadingPanel({ main, footnote }: ReadingPanelProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <article className="reading-content">
        {main}
      </article>
      {footnote && (
        <aside className="footnote-area">
          {footnote}
        </aside>
      )}
    </div>
  );
}

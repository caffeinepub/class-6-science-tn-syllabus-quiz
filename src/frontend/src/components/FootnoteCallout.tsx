import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

interface FootnoteCalloutProps {
  children: ReactNode;
  title?: string;
}

export default function FootnoteCallout({ children, title }: FootnoteCalloutProps) {
  return (
    <div className="footnote-callout space-y-3">
      <Separator className="bg-border/50" />
      {title && (
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      )}
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}

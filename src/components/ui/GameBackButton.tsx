import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import React from 'react';

interface GameBackButtonProps {
  onClick?: () => void;
  label?: string; // visible label (optional)
  showLabel?: boolean; // toggle showing text next to icon
  className?: string;
  floating?: boolean; // if true, position fixed at top-left of viewport
  tone?: 'light' | 'dark'; // visual style for background contrast
  motion?: boolean; // enable small icon nudge on hover
}

// High-contrast circular icon back button used on game screens.
// Always includes an accessible label (sr-only if text hidden).
export function GameBackButton({
  onClick,
  label = 'Back to Dashboard',
  showLabel = false,
  className = '',
  floating = false,
  tone = 'light',
  motion = true,
}: GameBackButtonProps) {
  const positionClasses = floating
    ? 'fixed top-6 left-6 z-50'
    : '';
  const colorClasses =
    tone === 'dark'
      ? 'bg-slate-900/90 hover:bg-slate-900 text-white border border-slate-700'
      : 'bg-white/90 hover:bg-white text-slate-800 hover:text-slate-900 border border-white/40';
  return (
    <Button
      onClick={onClick}
      aria-label={label}
      variant="ghost"
      className={[
        'group relative flex items-center justify-center rounded-full shadow-lg',
        'backdrop-blur transition-colors',
        'w-12 h-12 p-0',
        positionClasses,
        colorClasses,
        className,
      ].join(' ')}
    >
      <ArrowLeft className={["w-6 h-6", motion ? 'transition-transform group-hover:-translate-x-1' : ''].join(' ')} />
      {showLabel && (
        <span className="ml-2 font-medium text-sm text-slate-800">{label}</span>
      )}
      {!showLabel && (
        <span className="sr-only">{label}</span>
      )}
    </Button>
  );
}

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface VariableFontHoverProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | number;
  transition?: any;
  className?: string;
  onClick?: () => void;
}

export function VariableFontHover({
  label,
  fromFontVariationSettings = "'wght' 600, 'slnt' 0",
  toFontVariationSettings = "'wght' 850, 'slnt' -6",
  staggerDuration = 0.015,
  staggerFrom = 'first',
  className,
  onClick,
}: VariableFontHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Extract numeric weights for maximum cross-browser compatibility
  const extractWeight = (settings: string, fallback: number) => {
    const match = settings.match(/['"]wght['"]\s+(\d+)/);
    return match ? parseInt(match[1], 10) : fallback;
  };

  const extractSlant = (settings: string, fallback: number) => {
    const match = settings.match(/['"]slnt['"]\s+(-?\d+)/);
    return match ? parseInt(match[1], 10) : fallback;
  };

  const fromWeight = extractWeight(fromFontVariationSettings, 600);
  const toWeight = extractWeight(toFontVariationSettings, 850);
  const fromSlant = extractSlant(fromFontVariationSettings, 0);
  const toSlant = extractSlant(toFontVariationSettings, -6);

  // Split by words to preserve natural word wrapping across lines
  const words = label.split(' ');
  const totalChars = label.length;

  let globalCharIndex = 0;

  const getDelay = (index: number) => {
    if (typeof staggerFrom === 'number') {
      return Math.abs(index - staggerFrom) * staggerDuration;
    }
    if (staggerFrom === 'last') {
      return (totalChars - 1 - index) * staggerDuration;
    }
    if (staggerFrom === 'center') {
      const center = (totalChars - 1) / 2;
      return Math.abs(index - center) * staggerDuration;
    }
    return index * staggerDuration;
  };

  return (
    <span
      className={cn(
        'inline-flex flex-wrap items-center cursor-pointer select-none relative z-20',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {words.map((word, wordIndex) => {
        const letters = Array.from(word);

        return (
          <span key={wordIndex} className="inline-flex items-center whitespace-nowrap">
            {letters.map((char, charIndex) => {
              const currentGlobalIndex = globalCharIndex++;
              const delay = getDelay(currentGlobalIndex);

              return (
                <span
                  key={charIndex}
                  className="inline-block transform-gpu origin-bottom"
                  style={{
                    display: 'inline-block',
                    fontWeight: isHovered ? toWeight : fromWeight,
                    fontVariationSettings: isHovered
                      ? toFontVariationSettings
                      : fromFontVariationSettings,
                    transform: isHovered
                      ? `translateY(-3px) skewX(${toSlant}deg)`
                      : `translateY(0px) skewX(${fromSlant}deg)`,
                    transition: `font-weight 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, font-variation-settings 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export default VariableFontHover;

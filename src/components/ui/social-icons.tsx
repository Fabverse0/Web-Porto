import React from 'react';
import { SocialIcon, SocialPlatform } from './social-icon';
import { cn } from '@/lib/utils';

export interface SocialLinkItem {
  platform: SocialPlatform;
  href: string;
  label?: string;
  onClick?: () => void;
}

export interface SocialIconsGroupProps {
  items: SocialLinkItem[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost' | 'glow' | 'brand';
  className?: string;
}

export function SocialIconsGroup({
  items,
  size = 'md',
  variant = 'outline',
  className,
}: SocialIconsGroupProps) {
  return (
    <div className={cn('flex items-center gap-2.5 flex-wrap', className)}>
      {items.map((item, index) => (
        <SocialIcon
          key={`${item.platform}-${index}`}
          platform={item.platform}
          href={item.href}
          label={item.label}
          size={size}
          variant={variant}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

export default SocialIconsGroup;

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'x'
  | 'mail'
  | 'email'
  | 'discord'
  | 'youtube'
  | 'instagram'
  | 'website'
  | 'cv';

export interface SocialIconProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  platform: SocialPlatform;
  href?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost' | 'glow' | 'brand';
  showTooltip?: boolean;
  className?: string;
  iconClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Brand SVG Icons
const icons: Record<SocialPlatform, React.ReactNode> = {
  github: (
    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  twitter: (
    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  x: (
    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  mail: (
    <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  email: (
    <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  discord: (
    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  youtube: (
    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: (
    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  website: (
    <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  cv: (
    <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  ),
};

const brandHoverColors: Record<SocialPlatform, string> = {
  github: 'hover:border-[#09090B] dark:hover:border-[#FAFAFA] hover:text-[#09090B] dark:hover:text-[#FAFAFA]',
  linkedin: 'hover:border-[#0077B5] hover:text-[#0077B5]',
  twitter: 'hover:border-[#1DA1F2] hover:text-[#1DA1F2]',
  x: 'hover:border-[#09090B] dark:hover:border-[#FAFAFA] hover:text-[#09090B] dark:hover:text-[#FAFAFA]',
  mail: 'hover:border-[#10B981] hover:text-[#10B981]',
  email: 'hover:border-[#10B981] hover:text-[#10B981]',
  discord: 'hover:border-[#5865F2] hover:text-[#5865F2]',
  youtube: 'hover:border-[#FF0000] hover:text-[#FF0000]',
  instagram: 'hover:border-[#E4405F] hover:text-[#E4405F]',
  website: 'hover:border-[#2563EB] hover:text-[#2563EB]',
  cv: 'hover:border-[#10B981] hover:text-[#10B981]',
};

const sizeClasses = {
  sm: 'w-8 h-8 p-2',
  md: 'w-10 h-10 p-2.5',
  lg: 'w-12 h-12 p-3',
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-4.5 h-4.5',
  lg: 'w-5 h-5',
};

export const SocialIcon = React.forwardRef<HTMLAnchorElement, SocialIconProps>(
  (
    {
      platform,
      href,
      label,
      size = 'md',
      variant = 'outline',
      showTooltip = true,
      className,
      iconClassName,
      onClick,
      ...props
    },
    ref
  ) => {
    const icon = icons[platform] || icons.github;
    const defaultLabel = label || platform.charAt(0).toUpperCase() + platform.slice(1);

    const variantStyles = {
      default: 'bg-[#09090B] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#09090B] shadow-sm hover:opacity-90',
      outline:
        'bg-[#FFFFFF] dark:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:shadow-md ' +
        brandHoverColors[platform],
      ghost: 'bg-transparent text-[#71717A] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] ' + brandHoverColors[platform],
      glow: 'bg-[#FFFFFF] dark:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#27272A] hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:border-[#10B981] hover:text-[#10B981]',
      brand: 'bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm ' + brandHoverColors[platform],
    };

    return (
      <motion.a
        ref={ref}
        href={href}
        target={href && href.startsWith('http') ? '_blank' : undefined}
        rel={href && href.startsWith('http') ? 'noreferrer' : undefined}
        onClick={onClick}
        aria-label={defaultLabel}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]',
          sizeClasses[size],
          variantStyles[variant],
          className
        )}
        {...(props as any)}
      >
        <div className={cn('flex items-center justify-center transition-transform duration-200 group-hover:scale-110', iconSizes[size], iconClassName)}>
          {icon}
        </div>

        {/* Floating Tooltip */}
        {showTooltip && (
          <span className="absolute -top-9 scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom pointer-events-none px-2.5 py-1 rounded-md bg-[#09090B] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#09090B] text-[11px] font-mono whitespace-nowrap shadow-lg z-30">
            {defaultLabel}
          </span>
        )}
      </motion.a>
    );
  }
);

SocialIcon.displayName = 'SocialIcon';

export default SocialIcon;

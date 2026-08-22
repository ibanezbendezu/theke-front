import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', icon: Icon, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer",
                    {
                        'bg-primary text-on-primary hover:opacity-90 shadow-sm': variant === 'primary',
                        'bg-secondary text-on-secondary hover:opacity-90 shadow-sm': variant === 'secondary',
                        'border border-border bg-background hover:bg-surface text-on-background': variant === 'outline',
                        'hover:bg-surface-variant text-on-surface-variant hover:text-on-background': variant === 'ghost',
                        'h-8 px-3 text-xs': size === 'sm',
                        'h-10 px-4 text-sm': size === 'md',
                        'h-12 px-6 text-base': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {Icon && <Icon size={size === 'sm' ? 14 : 18} />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';
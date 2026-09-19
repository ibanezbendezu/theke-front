import React from 'react';
import { cn } from '../../lib/utils';
import { Search } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ElementType;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon: Icon = Search, ...props }, ref) => {
        return (
            <div className="relative flex items-center w-full">
                {Icon && <Icon size={16} className="absolute left-2.5 text-outline pointer-events-none" />}
                <input
                    ref={ref}
                    className={cn(
                        "w-full h-8 pl-8 pr-3 rounded-[4px] bg-surface/50 border border-transparent hover:border-border text-[14px] text-on-background placeholder:text-outline transition-all",
                        "focus:outline-none focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_2px_rgba(35,131,226,0.2)]",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';
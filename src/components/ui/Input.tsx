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
                {Icon && <Icon size={16} className="absolute left-3 text-outline" />}
                <input
                    ref={ref}
                    className={cn(
                        "w-full h-9 pl-9 pr-3 rounded-md border border-border bg-background text-sm text-on-background placeholder:text-outline transition-colors",
                        "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';
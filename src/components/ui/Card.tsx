import React from 'react';

interface CardProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    preview?: React.ReactNode;
    onClick?: () => void;
}

export const Card = ({ title, subtitle, icon, preview, onClick }: CardProps) => (
    <div
        onClick={onClick}
        className="group flex flex-col border border-border rounded-[4px] bg-background hover:bg-surface/30 cursor-pointer overflow-hidden transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
    >
        {/* Preview area (Cover de la tarjeta) */}
        <div className="h-28 bg-surface border-b border-border flex items-center justify-center relative overflow-hidden">
            {preview || <div className="text-outline/30">{icon}</div>}
        </div>
        {/* Metadatos */}
        <div className="p-2.5">
            <h3 className="text-[14px] font-medium text-on-background truncate leading-tight mb-0.5">{title}</h3>
            {subtitle && <p className="text-[12px] text-outline truncate">{subtitle}</p>}
        </div>
    </div>
);
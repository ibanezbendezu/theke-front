import type {ReactNode} from 'react';
import { ThemeProvider } from './../providers/ThemeProvider';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <>
            <ThemeProvider defaultTheme="system" storageKey="theke-theme">
                {children}
            </ThemeProvider>
        </>
    );
}
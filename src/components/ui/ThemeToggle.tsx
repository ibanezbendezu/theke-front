import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "../../providers/ThemeProvider"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex items-center gap-1 p-1 bg-surface-variant rounded-lg border border-border w-fit">
            <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-background shadow-sm text-primary' : 'text-outline hover:text-on-background'}`}
                title="Claro"
            >
                <Sun size={16} />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-md transition-colors ${theme === 'system' ? 'bg-background shadow-sm text-primary' : 'text-outline hover:text-on-background'}`}
                title="Sistema"
            >
                <Monitor size={16} />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-background shadow-sm text-primary' : 'text-outline hover:text-on-background'}`}
                title="Oscuro"
            >
                <Moon size={16} />
            </button>
        </div>
    )
}
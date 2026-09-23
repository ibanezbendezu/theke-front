export const safeDestination = (value: string | null) => value && /^\/(?![\\/])/.test(value) ? value : '/';

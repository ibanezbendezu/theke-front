export const safeDestination = (value: string | null) => value?.startsWith('/') && !value.startsWith('//') ? value : '/';

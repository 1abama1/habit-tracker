import { useState, useEffect, useCallback } from 'react';
import { habitStorage } from '../storage/habitStorage';

type Theme = 'light' | 'dark';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = habitStorage.getTheme();
        return saved === 'dark' ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        habitStorage.saveTheme(theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(t => (t === 'light' ? 'dark' : 'light'));
    }, []);

    return {
        theme,
        isDark: theme === 'dark',
        toggleTheme,
    };
};

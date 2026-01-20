import type {Habit, Completion} from '../types';

const HABITS_KEY = 'habits-tracker-habits';
const COMPLETIONS_KEY = 'habits-tracker-completions';
const THEME_KEY = 'habits-tracker-theme';

export const habitStorage = {
    getHabits(): Habit[] {
        try {
            const data = localStorage.getItem(HABITS_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    saveHabits(habits: Habit[]): void {
        try {
            localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
        } catch { /* empty */ }
    },

    getCompletions(): Completion[] {
        try {
            const data = localStorage.getItem(COMPLETIONS_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    saveCompletions(completions: Completion[]): void {
        try {
            localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
        } catch { /* empty */ }
    },

    getTheme(): string {
        return localStorage.getItem(THEME_KEY) || 'light';
    },

    saveTheme(theme: string): void {
        localStorage.setItem(THEME_KEY, theme);
    },

    clearOldCompletions(daysToKeep: number = 365): void {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
        const cutoffStr = cutoffDate.toISOString().split('T')[0];
        const completions = this.getCompletions().filter(c => c.date >= cutoffStr);
        this.saveCompletions(completions);
    },

    clearAll(): void {
        localStorage.removeItem(HABITS_KEY);
        localStorage.removeItem(COMPLETIONS_KEY);
    },

    exportData(): string {
        return JSON.stringify({
            habits: this.getHabits(),
            completions: this.getCompletions(),
            exportedAt: new Date().toISOString(),
        });
    },

    importData(jsonString: string): boolean {
        try {
            const data = JSON.parse(jsonString);
            if (Array.isArray(data.habits)) this.saveHabits(data.habits);
            if (Array.isArray(data.completions)) this.saveCompletions(data.completions);
            return true;
        } catch {
            return false;
        }
    }
};

import { useState, useEffect, useCallback } from 'react';
import type {Completion} from '../types';
import { habitStorage } from '../storage/habitStorage';
import { formatDate } from '../utils/dateUtils';

export const useCompletions = () => {
    const [completions, setCompletions] = useState<Completion[]>([]);

    useEffect(() => {
        const loaded = habitStorage.getCompletions();
        setCompletions(loaded);
    }, []);

    useEffect(() => {
        if (completions.length > 0 || habitStorage.getCompletions().length > 0) {
            habitStorage.saveCompletions(completions);
        }
    }, [completions]);

    const toggleCompletion = useCallback((habitId: string, date: Date) => {
        const dateStr = formatDate(date);

        setCompletions(prev => {
            const existing = prev.find(c => c.habitId === habitId && c.date === dateStr);

            if (existing) {
                return prev.filter(c => !(c.habitId === habitId && c.date === dateStr));
            } else {
                return [...prev, { habitId, date: dateStr, count: 1 }];
            }
        });
    }, []);

    const getHabitCompletions = useCallback((habitId: string): Completion[] => {
        return completions.filter(c => c.habitId === habitId);
    }, [completions]);

    const isCompleted = useCallback((habitId: string, date: Date): boolean => {
        const dateStr = formatDate(date);
        return completions.some(c => c.habitId === habitId && c.date === dateStr);
    }, [completions]);

    return {
        completions,
        toggleCompletion,
        getHabitCompletions,
        isCompleted,
    };
};
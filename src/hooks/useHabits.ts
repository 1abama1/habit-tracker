import { useState, useEffect, useCallback } from 'react';
import type {Habit} from '../types';
import { habitStorage } from '../storage/habitStorage';

export const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const loaded = habitStorage.getHabits();
        setHabits(loaded);
    }, []);

    // Сохранение при изменении
    useEffect(() => {
        if (habits.length > 0 || habitStorage.getHabits().length > 0) {
            habitStorage.saveHabits(habits);
        }
    }, [habits]);

    const addHabit = useCallback((habit: Omit<Habit, 'id' | 'createdAt' | 'isActive'>) => {
        const newHabit: Habit = {
            ...habit,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            isActive: true,
        };
        setHabits(prev => [...prev, newHabit]);
    }, []);

    const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
        setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
    }, []);

    const deleteHabit = useCallback((id: string) => {
        setHabits(prev => prev.filter(h => h.id !== id));
    }, []);

    const toggleActive = useCallback((id: string) => {
        setHabits(prev => prev.map(h =>
            h.id === id ? { ...h, isActive: !h.isActive } : h
        ));
    }, []);

    return {
        habits,
        activeHabits: habits.filter(h => h.isActive),
        archivedHabits: habits.filter(h => !h.isActive),
        addHabit,
        updateHabit,
        deleteHabit,
        toggleActive,
    };
};
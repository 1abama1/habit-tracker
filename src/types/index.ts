export type FrequencyType = 'daily' | 'weekly';

export interface Habit {
    id: string;
    title: string;
    color: string;
    frequency: FrequencyType;
    targetCount: number;
    createdAt: string;
    isActive: boolean;
}

export interface Completion {
    habitId: string;
    date: string;
    count: number;
}

export interface StreakInfo {
    current: number;
    best: number;
}

export interface HabitStats {
    habitId: string;
    completionRate: number;
    totalCompletions: number;
    streak: StreakInfo;
}

export interface CalendarDay {
    date: Date;
    completions: Map<string, number>;
    isCurrentMonth: boolean;
}

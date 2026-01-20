import type {Habit, Completion, StreakInfo} from '../types';
import { parseDate, getWeekNumber } from './dateUtils';

export const calculateStreak = (habit: Habit, completions: Completion[]): StreakInfo => {
    const dates = completions
        .filter(c => c.habitId === habit.id)
        .map(c => parseDate(c.date))
        .sort((a, b) => b.getTime() - a.getTime());

    if (!dates.length) return { current: 0, best: 0 };

    return habit.frequency === 'daily'
        ? dailyStreak(dates)
        : weeklyStreak(dates, habit.targetCount);
};

const dailyStreak = (dates: Date[]): StreakInfo => {
    let current = 0;
    let best = 0;
    let temp = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const check = new Date(dates[0]);
    check.setHours(0, 0, 0, 0);

    if (check.getTime() === today.getTime() || check.getTime() === yesterday.getTime()) {
        for (const d of dates) {
            const date = new Date(d);
            date.setHours(0, 0, 0, 0);
            if (date.getTime() === check.getTime()) {
                current++;
                check.setDate(check.getDate() - 1);
            } else break;
        }
    }

    for (let i = 0; i < dates.length; i++) {
        if (i === 0) {
            temp = 1;
        } else {
            const diff = (dates[i - 1].getTime() - dates[i].getTime()) / 86400000;
            if (diff === 1) temp++;
            else {
                best = Math.max(best, temp);
                temp = 1;
            }
        }
    }

    best = Math.max(best, temp, current);
    return { current, best };
};

const weeklyStreak = (dates: Date[], target: number): StreakInfo => {
    const map = new Map<string, number>();

    dates.forEach(d => {
        const key = `${d.getFullYear()}-W${getWeekNumber(d)}`;
        map.set(key, (map.get(key) || 0) + 1);
    });

    const weeks = [...map.entries()]
        .filter(([, c]) => c >= target)
        .map(([k]) => k)
        .sort()
        .reverse();

    if (!weeks.length) return { current: 0, best: 0 };

    let best = 0;
    let temp = 0;

    for (let i = 0; i < weeks.length; i++) {
        if (i === 0 || isConsecutive(weeks[i], weeks[i - 1])) temp++;
        else {
            best = Math.max(best, temp);
            temp = 1;
        }
    }

    best = Math.max(best, temp);
    return { current: best, best };
};

const isConsecutive = (a: string, b: string): boolean => {
    const [y1, w1] = a.split('-W').map(Number);
    const [y2, w2] = b.split('-W').map(Number);
    return y1 === y2 ? w1 - w2 === 1 : y1 - y2 === 1 && w2 === 52;
};

export const calculateHabitStats = (
    habit: Habit,
    completions: Completion[]
): {
    completionRate: number;
    totalCompletions: number;
    streak: StreakInfo;
} => {
    const habitCompletions = completions.filter(
        c => c.habitId === habit.id
    );

    const daysSinceCreation =
        Math.floor(
            (Date.now() - new Date(habit.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;

    const completionRate =
        daysSinceCreation > 0
            ? Math.min(
                100,
                Math.round(
                    (habitCompletions.length / daysSinceCreation) * 100
                )
            )
            : 0;

    return {
        completionRate,
        totalCompletions: habitCompletions.length,
        streak: calculateStreak(habit, completions),
    };
};

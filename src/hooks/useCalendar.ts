import { useState, useMemo } from 'react';
import type {CalendarDay} from '../types';
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth
} from 'date-fns';

export const useCalendar = (completions: any[]) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const calendarDays = useMemo((): CalendarDay[] => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Понедельник
        const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

        const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

        return days.map(date => {
            const dateStr = date.toISOString().split('T')[0];
            const dayCompletions = completions.filter(c => c.date === dateStr);

            const completionsMap = new Map<string, number>();
            dayCompletions.forEach(c => {
                completionsMap.set(c.habitId, c.count);
            });

            return {
                date,
                completions: completionsMap,
                isCurrentMonth: isSameMonth(date, currentDate),
            };
        });
    }, [currentDate, completions]);

    const nextMonth = () => {
        setCurrentDate(prev => {
            const next = new Date(prev);
            next.setMonth(next.getMonth() + 1);
            return next;
        });
    };

    const prevMonth = () => {
        setCurrentDate(prev => {
            const next = new Date(prev);
            next.setMonth(next.getMonth() - 1);
            return next;
        });
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    return {
        currentDate,
        calendarDays,
        nextMonth,
        prevMonth,
        goToToday,
    };
};
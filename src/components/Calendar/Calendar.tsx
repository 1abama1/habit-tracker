import React from 'react';
import type {Habit, CalendarDay as Day} from '../../types';
import { CalendarDay } from './CalendarDay';
import { format } from '../../utils/dateUtils';
import styles from './Calendar.module.css';

interface CalendarProps {
    currentDate: Date;
    calendarDays: Day[];
    activeHabits: Habit[];
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
    onToggleCompletion: (habitId: string, date: Date) => void;
    isCompleted: (habitId: string, date: Date) => boolean;
}

const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const Calendar: React.FC<CalendarProps> = ({
                                                      currentDate,
                                                      calendarDays,
                                                      activeHabits,
                                                      onPrevMonth,
                                                      onNextMonth,
                                                      onToday,
                                                      onToggleCompletion,
                                                      isCompleted,
                                                  }) => {
    return (
        <section className={styles.calendar}>
            <div className={styles.header}>
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <div className={styles.nav}>
                    <button onClick={onPrevMonth}>←</button>
                    <button onClick={onToday}>Today</button>
                    <button onClick={onNextMonth}>→</button>
                </div>
            </div>

            <div className={styles.grid}>
                {WEEK.map(d => (
                    <div key={d} className={styles.weekday}>{d}</div>
                ))}

                {calendarDays.map((day, i) => (
                    <CalendarDay
                        key={i}
                        date={day.date}
                        isCurrentMonth={day.isCurrentMonth}
                        habits={activeHabits}
                        completions={day.completions}
                        onToggleCompletion={habitId =>
                            onToggleCompletion(habitId, day.date)
                        }
                        isCompleted={habitId =>
                            isCompleted(habitId, day.date)
                        }
                    />
                ))}
            </div>
        </section>
    );
};

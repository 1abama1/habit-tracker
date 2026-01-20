import React from 'react';
import type {Habit} from '../../types';
import { formatDate } from '../../utils/dateUtils';
import styles from './CalendarDay.module.css';

interface Props {
    date: Date;
    isCurrentMonth: boolean;
    habits: Habit[];
    completions: Map<string, number>;
    onToggleCompletion: (habitId: string) => void;
    isCompleted: (habitId: string) => boolean;
}

export const CalendarDay: React.FC<Props> = ({
                                                 date,
                                                 isCurrentMonth,
                                                 habits,
                                                 onToggleCompletion,
                                                 isCompleted
                                             }) => {
    return (
        <div className={`${styles.day} ${!isCurrentMonth ? styles.other : ''}`}>
            <div className={styles.date}>{formatDate(date).slice(-2)}</div>

            {habits.map(habit => (
                <button
                    key={habit.id}
                    className={styles.dot}
                    style={{
                        background: isCompleted(habit.id)
                            ? habit.color
                            : 'var(--border)'
                    }}
                    onClick={() => onToggleCompletion(habit.id)}
                />
            ))}
        </div>
    );
};

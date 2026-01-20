import React from 'react';
import type {Habit, StreakInfo} from '../../types';
import styles from './HabitItem.module.css';

interface Props {
    habit: Habit;
    isCompleted: boolean;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onArchive: () => void;
    streak: StreakInfo;
}

export const HabitItem: React.FC<Props> = ({
                                               habit,
                                               isCompleted,
                                               onToggle,
                                               onEdit,
                                               onDelete,
                                               onArchive,
                                               streak
                                           }) => {
    return (
        <div className={styles.item} style={{ borderLeftColor: habit.color }}>
            <button
                className={styles.check}
                onClick={onToggle}
                style={{ background: isCompleted ? habit.color : 'transparent' }}
            />

            <span className={styles.title}>{habit.title}</span>

            <span className={styles.streak}>🔥 {streak.current}</span>

            <div className={styles.actions}>
                <button onClick={onEdit}>✏️</button>
                <button onClick={onArchive}>{habit.isActive ? '📦' : '📤'}</button>
                <button onClick={onDelete}>🗑️</button>
            </div>
        </div>
    );
};

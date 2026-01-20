import React, { useState } from 'react';
import type {Habit, Completion} from '../../types';
import { HabitForm } from './HabitForm';
import { HabitItem } from './HabitItem';
import { calculateStreak } from '../../utils/streakCalculator';
import styles from './Sidebar.module.css';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

interface SidebarProps {
    habits: Habit[];
    activeHabits: Habit[];
    archivedHabits: Habit[];
    onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'isActive'>) => void;
    onUpdateHabit: (id: string, updates: Partial<Habit>) => void;
    onDeleteHabit: (id: string) => void;
    onToggleActive: (id: string) => void;
    isCompleted: (habitId: string, date: Date) => boolean;
    onToggleCompletion: (habitId: string, date: Date) => void;
    completions: Completion[];
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                    activeHabits,
                                                    archivedHabits,
                                                    onAddHabit,
                                                    onUpdateHabit,
                                                    onDeleteHabit,
                                                    onToggleActive,
                                                    isCompleted,
                                                    onToggleCompletion,
                                                    completions,
                                                }) => {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Habit | null>(null);
    const [showArchived, setShowArchived] = useState(false);

    const today = new Date();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <h1 className={styles.title}>Habits</h1>
                <ThemeToggle />
            </div>
            {!showForm && !editing && (
                <button
                    className={styles.addButton}
                    onClick={() => setShowForm(true)}
                >
                    + New Habit
                </button>
            )}

            {showForm && (
                <HabitForm
                    onSubmit={habit => {
                        onAddHabit(habit);
                        setShowForm(false);
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editing && (
                <HabitForm
                    initialData={editing}
                    onSubmit={habit => {
                        onUpdateHabit(editing.id, habit);
                        setEditing(null);
                    }}
                    onCancel={() => setEditing(null)}
                />
            )}

            <div className={styles.section}>
                {activeHabits.map(habit => (
                    <HabitItem
                        key={habit.id}
                        habit={habit}
                        isCompleted={isCompleted(habit.id, today)}
                        onToggle={() => onToggleCompletion(habit.id, today)}
                        onEdit={() => setEditing(habit)}
                        onDelete={() => onDeleteHabit(habit.id)}
                        onArchive={() => onToggleActive(habit.id)}
                        streak={calculateStreak(habit, completions)}
                    />
                ))}
            </div>

            {archivedHabits.length > 0 && (
                <div className={styles.section}>
                    <button
                        className={styles.archiveToggle}
                        onClick={() => setShowArchived(v => !v)}
                    >
                        {showArchived ? '▼' : '▶'} Archived ({archivedHabits.length})
                    </button>

                    {showArchived &&
                        archivedHabits.map(habit => (
                            <HabitItem
                                key={habit.id}
                                habit={habit}
                                isCompleted={false}
                                onToggle={() => {}}
                                onEdit={() => setEditing(habit)}
                                onDelete={() => onDeleteHabit(habit.id)}
                                onArchive={() => onToggleActive(habit.id)}
                                streak={calculateStreak(habit, completions)}
                            />
                        ))}
                </div>
            )}
        </aside>
    );
};

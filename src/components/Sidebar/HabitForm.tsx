import React, { useState, type FormEvent } from 'react';
import type {Habit, FrequencyType} from '../../types';
import styles from './HabitForm.module.css';

const COLORS = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#A29BFE',
    '#FD79A8'
];

interface Props {
    onSubmit: (habit: Omit<Habit, 'id' | 'createdAt' | 'isActive'>) => void;
    onCancel: () => void;
    initialData?: Habit;
}

export const HabitForm: React.FC<Props> = ({ onSubmit, onCancel, initialData }) => {
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [color, setColor] = useState(initialData?.color ?? COLORS[0]);
    const [frequency, setFrequency] = useState<FrequencyType>(
        initialData?.frequency ?? 'daily'
    );
    const [targetCount, setTargetCount] = useState(
        initialData?.targetCount ?? 3
    );

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title, color, frequency, targetCount });
    };

    return (
        <form onSubmit={submit} className={styles.form}>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={styles.input}
                placeholder="Habit name"
                maxLength={50}
                autoFocus
            />

            <div className={styles.colors}>
                {COLORS.map(c => (
                    <button
                        key={c}
                        type="button"
                        className={`${styles.color} ${c === color ? styles.active : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setColor(c)}
                    />
                ))}
            </div>

            <select
                value={frequency}
                onChange={e => setFrequency(e.target.value as FrequencyType)}
                className={styles.select}
            >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
            </select>

            {frequency === 'weekly' && (
                <input
                    type="number"
                    min={1}
                    max={7}
                    value={targetCount}
                    onChange={e => setTargetCount(+e.target.value)}
                    className={styles.input}
                />
            )}

            <div className={styles.actions}>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

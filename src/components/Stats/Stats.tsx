import React, { useMemo } from 'react';
import type {Habit, Completion} from '../../types';
import { calculateHabitStats } from '../../utils/streakCalculator';
import styles from './Stats.module.css';

interface StatsProps {
    habits: Habit[];
    completions: Completion[];
}

export const Stats: React.FC<StatsProps> = ({ habits, completions }) => {
    const stats = useMemo(() => {
        return habits.map(habit => ({
            habit,
            stats: calculateHabitStats(habit, completions),
        }));
    }, [habits, completions]);

    if (habits.length === 0) {
        return (
            <div className={styles.empty}>
                No habits yet
            </div>
        );
    }

    return (
        <div className={styles.stats}>
            <h2 className={styles.title}>Statistics</h2>

            <div className={styles.list}>
                {stats.map(({ habit, stats }) => (
                    <div key={habit.id} className={styles.card}>
                        <div className={styles.header}>
              <span
                  className={styles.color}
                  style={{ backgroundColor: habit.color }}
              />
                            <span className={styles.name}>{habit.title}</span>
                        </div>

                        <div className={styles.metrics}>
                            <div className={styles.metric}>
                                <span className={styles.value}>{stats.completionRate}%</span>
                                <span className={styles.label}>Completion</span>
                            </div>

                            <div className={styles.metric}>
                                <span className={styles.value}>{stats.totalCompletions}</span>
                                <span className={styles.label}>Total</span>
                            </div>

                            <div className={styles.metric}>
                                <span className={styles.value}>🔥 {stats.streak.current}</span>
                                <span className={styles.label}>Current</span>
                            </div>

                            <div className={styles.metric}>
                                <span className={styles.value}>🏆 {stats.streak.best}</span>
                                <span className={styles.label}>Best</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

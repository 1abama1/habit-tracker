import React from 'react';
import { useHabits } from './hooks/useHabits';
import { useCompletions } from './hooks/useCompletions';
import { useCalendar } from './hooks/useCalendar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Calendar } from './components/Calendar/Calendar';
import { Stats } from './components/Stats/Stats';
import styles from './App.module.css';

export const App: React.FC = () => {
    const habits = useHabits();
    const completions = useCompletions();
    const calendar = useCalendar(completions.completions);

    return (
        <div className={styles.app}>
            <Sidebar
                habits={habits.habits}
                activeHabits={habits.activeHabits}
                archivedHabits={habits.archivedHabits}
                onAddHabit={habits.addHabit}
                onUpdateHabit={habits.updateHabit}
                onDeleteHabit={habits.deleteHabit}
                onToggleActive={habits.toggleActive}
                isCompleted={completions.isCompleted}
                onToggleCompletion={completions.toggleCompletion}
                completions={completions.completions}
            />

            <main className={styles.main}>

                <Calendar
                    currentDate={calendar.currentDate}
                    calendarDays={calendar.calendarDays}
                    activeHabits={habits.activeHabits}
                    onPrevMonth={calendar.prevMonth}
                    onNextMonth={calendar.nextMonth}
                    onToday={calendar.goToToday}
                    onToggleCompletion={completions.toggleCompletion}
                    isCompleted={completions.isCompleted}
                />

                <Stats
                    habits={habits.habits}
                    completions={completions.completions}
                />
            </main>
        </div>
    );
};

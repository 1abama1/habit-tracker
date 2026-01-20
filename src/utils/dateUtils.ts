export const formatDate = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export const parseDate = (dateStr: string): Date => new Date(dateStr);

export const isToday = (date: Date): boolean =>
    formatDate(date) === formatDate(new Date());

export const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

export const startOfMonth = (date: Date): Date =>
    new Date(date.getFullYear(), date.getMonth(), 1);

export const endOfMonth = (date: Date): Date =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const startOfWeek = (date: Date, { weekStartsOn = 1 } = {}): Date => {
    const day = date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    const result = new Date(date);
    result.setDate(date.getDate() - diff);
    result.setHours(0, 0, 0, 0);
    return result;
};

export const endOfWeek = (date: Date, opts = { weekStartsOn: 1 }): Date => {
    const start = startOfWeek(date, opts);
    const result = new Date(start);
    result.setDate(start.getDate() + 6);
    return result;
};

export const eachDayOfInterval = ({ start, end }: { start: Date; end: Date }): Date[] => {
    const days: Date[] = [];
    const current = new Date(start);
    while (current <= end) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return days;
};

export const isSameMonth = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const format = (date: Date, pattern: string): string => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (pattern === 'MMMM yyyy') {
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    if (pattern === 'd') {
        return String(date.getDate());
    }

    return date.toDateString();
};


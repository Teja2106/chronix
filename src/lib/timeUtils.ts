/**
 * Formats relative time since last worked.
 * If < 1 hour: displays in minutes or "Just now"
 * If < 24 hours: displays in hours (e.g. "2 hrs ago")
 * If >= 24 hours: displays in days (e.g. "1 day ago", "3 days ago")
 */
export function formatLastWorked(dateInput?: string | Date | number | null): string {
    if (!dateInput) return "Just now";

    const date = new Date(dateInput);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    if (isNaN(date.getTime()) || diffMs <= 0) {
        return "Just now";
    }

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
        return "Just now";
    }

    if (diffMinutes < 60) {
        return `${diffMinutes} min${diffMinutes === 1 ? '' : 's'} ago`;
    }

    if (diffHours < 24) {
        return `${diffHours} hr${diffHours === 1 ? '' : 's'} ago`;
    }

    const days = Math.max(1, diffDays);
    return `${days} day${days === 1 ? '' : 's'} ago`;
}

/**
 * Formats hours and minutes into invested time string (e.g. "142h 30m")
 */
export function formatInvestedTime(totalHours: number = 0, totalMinutes: number = 0): string {
    const hours = Math.floor(totalHours) + Math.floor(totalMinutes / 60);
    const mins = Math.floor(totalMinutes % 60);
    return `${hours}h ${String(mins).padStart(2, '0')}m`;
}

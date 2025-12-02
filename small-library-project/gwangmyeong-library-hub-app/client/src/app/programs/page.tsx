'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ProgramsPage() {
    const [view, setView] = useState<'calendar' | 'list'>('calendar');

    // Mock Data
    const programs = [
        { id: 1, title: 'Kids Storytelling', date: '2025-12-05', library: 'Library 1' },
        { id: 2, title: 'Digital Literacy', date: '2025-12-12', library: 'Library 2' },
        { id: 3, title: 'Book Club', date: '2025-12-15', library: 'Library 3' },
    ];

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Programs & Events</h1>
                <div className={styles.viewToggle}>
                    <button
                        className={`${styles.toggleBtn} ${view === 'calendar' ? styles.active : ''}`}
                        onClick={() => setView('calendar')}
                    >
                        Calendar
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${view === 'list' ? styles.active : ''}`}
                        onClick={() => setView('list')}
                    >
                        List
                    </button>
                </div>
            </div>

            {view === 'calendar' ? (
                <div className={styles.calendarGrid}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className={styles.calendarHeader}>{day}</div>
                    ))}
                    {/* Mock Calendar Days (35 days) */}
                    {Array.from({ length: 35 }).map((_, i) => {
                        const day = i - 2; // Offset for mock
                        const dateStr = `2025-12-${String(day).padStart(2, '0')}`;
                        const dayEvents = programs.filter(p => p.date === dateStr);

                        return (
                            <div key={i} className={styles.calendarDay}>
                                {day > 0 && day <= 31 && (
                                    <>
                                        <span className={styles.dayNumber}>{day}</span>
                                        {dayEvents.map(event => (
                                            <div key={event.id} className={styles.event}>
                                                {event.title}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.listGrid}>
                    {programs.map(program => (
                        <div key={program.id} className="card">
                            <h3 style={{ marginBottom: '0.5rem' }}>{program.title}</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
                                {program.date} @ {program.library}
                            </p>
                            <button className="btn btn-outline" style={{ width: '100%' }}>Register</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

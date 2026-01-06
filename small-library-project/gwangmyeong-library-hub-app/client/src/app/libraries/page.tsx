'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function LibrariesPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    // Mock Data
    const libraries = [
        { id: 1, name: 'Gwangmyeong Small Library 1', address: '123 Cheolsan-dong', type: 'Public' },
        { id: 2, name: 'Gwangmyeong Small Library 2', address: '456 Haan-dong', type: 'Private' },
        { id: 3, name: 'Gwangmyeong Small Library 3', address: '789 Soha-dong', type: 'Public' },
    ];

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.sidebar}>
                <div className={styles.filters}>
                    <input
                        type="text"
                        placeholder="Search libraries..."
                        className={styles.searchBar}
                    />
                    <div className={styles.filterGroup}>
                        {['All', 'Public', 'Private', 'Kids', 'Digital'].map((filter) => (
                            <button
                                key={filter}
                                className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.list}>
                    {libraries.map((lib) => (
                        <div key={lib.id} className={`card ${styles.card}`}>
                            <h3 style={{ marginBottom: '0.5rem' }}>{lib.name}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                {lib.address}
                            </p>
                            <span className="badge badge-primary">{lib.type}</span>
                            <div style={{ marginTop: '1rem' }}>
                                <Link href={`/libraries/${lib.id}`} className="btn btn-outline" style={{ width: '100%', padding: '0.5rem' }}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.mapContainer}>
                {/* Placeholder for Map */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted)'
                }}>
                    Map View (Kakao Map API Integration)
                </div>
            </div>
        </div>
    );
}

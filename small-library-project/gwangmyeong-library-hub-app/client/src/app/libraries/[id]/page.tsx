import styles from './page.module.css';

export default async function LibraryDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gwangmyeong Small Library {id}</h1>
                <div className={styles.meta}>
                    <span className="badge badge-primary">Public</span>
                    <span>123 Cheolsan-dong, Gwangmyeong-si</span>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.mainContent}>
                    <div className={styles.imageGallery}>
                        {/* Image Placeholder */}
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
                            Library Image
                        </div>
                    </div>

                    <section className={styles.section}>
                        <h2>About</h2>
                        <p>
                            This is a cozy small library located in the heart of the community.
                            We offer a wide range of books for children and adults, as well as various cultural programs.
                            Our goal is to foster a love for reading and provide a welcoming space for everyone.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>Programs</h2>
                        <div className="card">
                            <h3>Weekly Reading Club</h3>
                            <p style={{ color: 'var(--muted)', margin: '0.5rem 0' }}>Every Wednesday, 10:00 AM</p>
                            <p>Join us for a lively discussion about this month's selected book.</p>
                        </div>
                    </section>
                </div>

                <aside>
                    <div className={styles.infoCard}>
                        <div className={styles.infoItem}>
                            <h3>Operating Hours</h3>
                            <p>Mon - Fri: 09:00 - 18:00</p>
                            <p>Sat: 10:00 - 14:00</p>
                            <p style={{ color: 'var(--error)' }}>Sun: Closed</p>
                        </div>
                        <div className={styles.infoItem}>
                            <h3>Contact</h3>
                            <p>02-1234-5678</p>
                            <p>email@example.com</p>
                        </div>
                        <div className={styles.infoItem}>
                            <h3>Location</h3>
                            <div style={{ height: '150px', background: '#f1f5f9', borderRadius: '8px', marginTop: '0.5rem' }}>
                                {/* Map Placeholder */}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

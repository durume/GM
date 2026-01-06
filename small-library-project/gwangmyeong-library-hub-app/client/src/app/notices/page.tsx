export default function NoticesPage() {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 className="section-title">Notices</h1>
            <p className="section-subtitle">Important announcements and updates.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span className="badge" style={{ background: '#f1f5f9', marginRight: '1rem' }}>Notice</span>
                            <span style={{ fontWeight: 600 }}>Important Announcement {i}</span>
                        </div>
                        <span style={{ color: 'var(--muted)' }}>2025-12-{10 + i}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

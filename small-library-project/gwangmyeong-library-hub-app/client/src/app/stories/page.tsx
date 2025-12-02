export default function StoriesPage() {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 className="section-title">Stories</h1>
            <p className="section-subtitle">Read about the people and events in our small libraries.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} className="card">
                        <div style={{ height: '200px', background: '#e2e8f0', borderRadius: '8px', marginBottom: '1rem' }} />
                        <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Interview</span>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Meeting the Librarian of Library {i}</h3>
                        <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
                            We sat down with the head librarian to discuss their vision for the community...
                        </p>
                        <button className="btn btn-outline">Read More</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

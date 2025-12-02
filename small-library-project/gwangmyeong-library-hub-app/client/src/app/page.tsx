import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Discover Gwangmyeong's<br />Small Libraries
          </h1>
          <p className={styles.heroSubtitle}>
            Find your local community hub for reading, learning, and connecting.
            Explore programs, events, and more.
          </p>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search for libraries, programs, or locations..."
              className={styles.searchInput}
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">Featured Libraries</h2>
          <p className="section-subtitle">Explore popular small libraries in your neighborhood.</p>

          <div className={styles.grid}>
            {/* Mock Data for now */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <div className={styles.cardImage} />
                <h3 className={styles.cardTitle}>Gwangmyeong Small Library {i}</h3>
                <p className={styles.cardDesc}>
                  A cozy space for children and parents to enjoy reading together.
                  Featuring a large collection of picture books.
                </p>
                <div className={styles.tags}>
                  <span className="badge badge-primary">Reading Club</span>
                  <span className="badge badge-primary">Kids</span>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Link href={`/libraries/${i}`} className="btn btn-outline" style={{ width: '100%' }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

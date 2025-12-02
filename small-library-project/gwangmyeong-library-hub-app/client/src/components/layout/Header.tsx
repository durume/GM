import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Gwangmyeong<span className={styles.highlight}>Hub</span>
                </Link>
                <nav className={styles.nav}>
                    <Link href="/libraries" className={styles.navLink}>Libraries</Link>
                    <Link href="/programs" className={styles.navLink}>Programs</Link>
                    <Link href="/stories" className={styles.navLink}>Stories</Link>
                    <Link href="/notices" className={styles.navLink}>Notices</Link>
                </nav>
                <div className={styles.actions}>
                    <Link href="/admin" className="btn btn-primary">Admin</Link>
                </div>
            </div>
        </header>
    );
}

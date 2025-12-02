import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3>Gwangmyeong Small Library Hub</h3>
                        <p>Connecting citizens with knowledge and community.</p>
                    </div>
                    <div className={styles.links}>
                        <h4>Contact</h4>
                        <p>Email: contact@gm-library.or.kr</p>
                        <p>Phone: 02-1234-5678</p>
                    </div>
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Gwangmyeong Small Library Hub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

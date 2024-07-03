import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <Link to="/">Goods4you</Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/#catalog">Catalog</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/#faq">FAQ</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
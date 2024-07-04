import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ScrollToSectionProps } from '../../interfaces/types';

const Footer: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <Link to="/" onClick={() => scrollToSection('home')}>Goods4you</Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/" onClick={() => scrollToSection('catalog')}>Catalog</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/" onClick={() => scrollToSection('faq')}>FAQ</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
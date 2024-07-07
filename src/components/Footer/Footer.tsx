import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ScrollToSectionProps } from '../../interfaces/types';

const Footer: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    return (
        <footer className={styles.footer} role="contentinfo" aria-label="Footer">
            <div className={styles.logo}>
                <Link to="/" onClick={() => scrollToSection('home')} aria-label="Logo">Goods4you</Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList} role="navigation" aria-label="Footer Navigation">
                    <li className={styles.navItem}>
                        <Link to="/catalog" onClick={() => scrollToSection('catalog')} aria-label="Catalog">Catalog</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/faq" onClick={() => scrollToSection('faq')} aria-label="FAQ">FAQ</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
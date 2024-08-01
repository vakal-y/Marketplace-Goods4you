import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ScrollToSectionProps } from '../../interfaces/types';
import Logo from '../../ui/Logo';

const Footer: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLinkClick = (section: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (location.pathname === '/') {
            scrollToSection(section);
        } else {
            navigate('/');
            setTimeout(() => {
                scrollToSection(section);
            }, 100);
        }
    };

    return (
        <footer className={styles.footer} role="contentinfo" aria-label="Footer">
            <Logo scrollToSection={scrollToSection} />
            <nav className={styles.nav}>
                <ul className={styles.navList} role="navigation" aria-label="Footer Navigation">
                    <li className={styles.navItem}>
                        <Link to="/" onClick={(event) => handleLinkClick('catalog', event)} aria-label="Catalog">Catalog</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/" onClick={(event) => handleLinkClick('faq', event)} aria-label="FAQ">FAQ</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
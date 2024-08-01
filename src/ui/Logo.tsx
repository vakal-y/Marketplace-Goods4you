import styles from './Logo.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { LogoProps } from '../interfaces/types';

const Logo: React.FC<LogoProps> = ({ scrollToSection }) => {
    const location = useLocation();

    const handleLinkClick = (section: string, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (location.pathname === '/') {
            scrollToSection(section);
        } else {
            window.location.href = '/#home';
        }
    };

    return (
        <div className={styles.logo}>
            <Link to="/" onClick={(event) => handleLinkClick('home', event)} aria-label="Logo">
                Goods4you
            </Link>
        </div>
    );
};

export default Logo;
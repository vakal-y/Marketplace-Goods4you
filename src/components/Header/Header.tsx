import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import cart from '../../assets/cart.svg';
import counter from '../../assets/counter.svg';
import { ScrollToSectionProps } from '../../interfaces/types';

const Header: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    return (
        <header className={styles.header} aria-label="Site Header">
            <div className={styles.logo}>
                <Link to="/" onClick={() => scrollToSection('home')} aria-label="Logo">Goods4you</Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList} role="navigation" aria-label="Main Navigation">
                    <li className={styles.navItem}>
                        <Link to="/" onClick={() => scrollToSection('catalog')} aria-label="Catalog">Catalog</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/" onClick={() => scrollToSection('faq')} aria-label="FAQ">FAQ</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/cart" aria-label="Cart">
                            <span>Cart</span>
                            <img className={styles.navImage} src={cart} alt="cart" />
                            <img className={styles.counterImage} src={counter} alt="counter" />
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="#" aria-label="User Account">Личный кабинет</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
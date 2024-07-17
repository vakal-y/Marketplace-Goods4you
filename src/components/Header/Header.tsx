import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../../services/authApi';
import styles from './Header.module.scss';
import cart from '../../assets/cart.svg';
import { ScrollToSectionProps } from '../../interfaces/types';
import Logo from '../../ui/Logo';

const Header: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const { data: user, error, isLoading } = useGetCurrentUserQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const [totalQuantity, setTotalQuantity] = useState<number | null>(null);

    useEffect(() => {
        const userId = 33;

        fetch(`https://dummyjson.com/carts/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.carts && data.carts.length > 0 && data.carts[0].totalQuantity > 0) {
                    setTotalQuantity(data.carts[0].totalQuantity);
                }
            })
            .catch(err => console.error('Error fetching cart data:', err));
    }, []);

    const handleLinkClick = (section: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (location.pathname === '/') {
            scrollToSection(section);
        } else {
            navigate('/', { replace: true });
            setTimeout(() => {
                scrollToSection(section);
            }, 100);
        }
    };

    return (
        <header className={styles.header} aria-label="Site Header">
            <Logo scrollToSection={scrollToSection} />
            <nav className={styles.nav}>
                <ul className={styles.navList} role="navigation" aria-label="Main Navigation">
                    <li className={styles.navItem}>
                        <Link to="/" onClick={(event) => handleLinkClick('catalog', event)} aria-label="Catalog">Catalog</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/" onClick={(event) => handleLinkClick('faq', event)} aria-label="FAQ">FAQ</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/cart" aria-label="Cart">
                            <span>Cart</span>
                            <img className={styles.navImage} src={cart} alt="cart" />
                            {totalQuantity !== null && totalQuantity > 0 && (
                                <span className={styles.counter}>{totalQuantity}</span>
                            )}
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        {user ? (
                            <span>{user.firstName} {user.lastName}</span>
                        ) : (
                            <Link to="/login" aria-label="Sign In">Sign in</Link>
                        )
                        }
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
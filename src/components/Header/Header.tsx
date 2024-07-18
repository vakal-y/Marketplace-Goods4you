import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import cart from '../../assets/cart.svg';
import { ScrollToSectionProps } from '../../interfaces/types';
import Logo from '../../ui/Logo';
import { useGetCurrentUserQuery } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { logout, setUser } from '../../slices/authSlice';

const Header: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [totalQuantity, setTotalQuantity] = useState<number | null>(null);
    const token = localStorage.getItem('token');


    const { data: user, error, isLoading } = useGetCurrentUserQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
            fetchCartData(user.id);
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (error) {
            dispatch(logout());
            navigate('/login');
        }
    }, [error, navigate, dispatch]);

    const fetchCartData = async (userId: number) => {
        try {
            const response = await fetch(`https://dummyjson.com/carts/user/${userId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.carts && data.carts.length > 0 && data.carts[0].totalQuantity > 0) {
                    setTotalQuantity(data.carts[0].totalQuantity);
                } else {
                    setTotalQuantity(0);
                }
            } else {
                console.error('Failed to fetch cart data:', response.status);
                setTotalQuantity(0);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setTotalQuantity(0);
        }
    };


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
                            {user && totalQuantity !== null && totalQuantity > 0 && (
                                <span className={styles.counter}>{totalQuantity}</span>
                            )}
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : user ? (
                            <span>{user.firstName} {user.lastName}</span>
                        ) : (
                            <Link to="/login" aria-label="Sign In">Sign in</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
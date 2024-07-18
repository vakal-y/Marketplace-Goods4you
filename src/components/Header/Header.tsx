import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import cart from '../../assets/cart.svg';
import { ScrollToSectionProps } from '../../interfaces/types';
import Logo from '../../ui/Logo';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../helpers/hook';
import { fetchCart, selectCartItems } from '../../slices/cartSlice';

const Header: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    const cartItems = useAppSelector(selectCartItems);

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);


    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCart());
        }
    }, [user, dispatch]);

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
                            {isAuthenticated && totalQuantity !== null && totalQuantity > 0 && (
                                <span className={styles.counter}>{totalQuantity}</span>
                            )}
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        {isAuthenticated ? (
                            <span>{user?.firstName} {user?.lastName}</span>
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
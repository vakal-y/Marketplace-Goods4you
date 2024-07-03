import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import cart from '../../assets/cart.svg';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
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
                    <li className={styles.navItem}>
                        <Link to="/cart">
                            <span>Cart</span>
                            <img className={styles.navImage} src={cart} alt="cart" />
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="#">Личный кабинет</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import cart from '../../assets/cart.svg';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>Goods4you</Link>
            <nav className={styles.nav}>
                <Link to="/catalog">Catalog</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/cart" className={styles.cart}>
                    Cart
                    <img className={styles.img} src={cart} alt="cart" />
                </Link>
                <Link to="/user-dashboard">Личный кабинет</Link>
            </nav>
        </header>
    );
};

export default Header;
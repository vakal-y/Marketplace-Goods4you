import styles from './ButtonAddToCart.module.scss';
import { ButtonAddToCartProps } from '../interfaces/types';

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ onClick, size, children, disabled, icon, ariaLabel }) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.productAddToCart} ${styles[size]} ${styles[size]}`}
            aria-label={ariaLabel}
            disabled={disabled}>
            {icon ? <img src={icon} alt="Cart Icon" className={styles.icon} /> : children}
        </button>
    )
}

export default ButtonAddToCart;
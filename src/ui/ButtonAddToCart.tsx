import styles from './ButtonAddToCart.module.scss';
import { ButtonAddToCartProps } from '../interfaces/types';

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className={styles.productAddToCart}
            aria-label="Add to Cart">
            Add to Cart
        </button>
    )
}

export default ButtonAddToCart;
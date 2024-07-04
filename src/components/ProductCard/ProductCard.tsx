import styles from './ProductCard.module.scss';
import { Product } from '../../interfaces/types';
import cart from '../../assets/cart.svg'

const ProductCard: React.FC<Product> = ({ id, name, price, image }) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.productImage}>
                <img src={image} alt={name} />
                <div className={styles.overlay}>
                    <span className={styles.detailsText}>Show details</span>
                </div>
            </div>
            <div className={styles.productInfo}>
                <div className={styles.productText}>
                    <h2>{name}</h2>
                    <p>{price}$</p>
                </div>
                <button className={styles.cardButton}>
                    <img src={cart} alt="" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
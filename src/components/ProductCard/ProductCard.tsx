import styles from './ProductCard.module.scss';
import { Product } from '../../interfaces/types';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { id, name, price, image } = product;
    return (
        <div className={styles.productCard}>
            <Link to={`/product/${id}`} className={styles.productLink}>
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
            </Link>
        </div>
    );
};

export default ProductCard;
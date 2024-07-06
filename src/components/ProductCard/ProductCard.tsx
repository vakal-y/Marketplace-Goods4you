import styles from './ProductCard.module.scss';
import { Product } from '../../interfaces/types';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { id, name, price, image } = product;

    return (
        <div className={styles.productCard}
            aria-labelledby={`product-name-${id}`}
            aria-describedby={`product-price-${id}`}>
            <Link to={`/product/${id}`}
                className={styles.productLink}
                aria-label={`View details for ${name}`}>
                <div className={styles.productImage}>
                    <img src={image} alt={name} aria-describedby={`product-title-${id}`} />
                    <div className={styles.overlay}>
                        <span className={styles.detailsText}>Show details</span>
                    </div>
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productText}>
                        <h2 id={`product-title-${id}`}>{name}</h2>
                        <p aria-label={`Price: ${price} dollars`}>{price}$</p>
                    </div>
                    <button className={styles.cardButton} aria-label={`Add ${name} to cart`}>
                        <img src={cart} alt="" />
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
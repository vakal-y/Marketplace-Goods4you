import styles from './ProductCard.module.scss';
import { Product } from '../../interfaces/types';

const ProductCard: React.FC<Product> = ({ id, name, price, image }) => {
    return (
        <div className={styles.productCard}>
            <img src={image} alt={name} className={styles.productImage} />
            <h2 className={styles.productName}>{name}</h2>
            <p className={styles.productPrice}>{price}$</p>
        </div>
    );
};

export default ProductCard;
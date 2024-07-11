import styles from './CartItem.module.scss';
import { useState } from 'react';
import { Product } from '../../interfaces/types';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';
import minusSmall from '../../assets/minusSmall.svg';
import plusSmall from '../../assets/plusSmall.svg';

const CartItem: React.FC<{ product: Product }> = ({ product }) => {
    const { id, title, price, thumbnail } = product;
    const mainImage = thumbnail;
    const [cartQuantity, setCartQuantity] = useState<number>(1);
    const [showControls, setShowControls] = useState<boolean>(true);

    const handleAddToCart = () => {
        setCartQuantity(1);
        setShowControls(true);
    };

    const handleDelete = () => {
        setShowControls(false);
    };

    const handleIncreaseQuantity = () => {
        setCartQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (cartQuantity > 1) {
            setCartQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <div className={styles.cartItem}>
            <div className={`${styles.cartLeft} ${!showControls ? styles.faded : ''}`}>
                <div className={styles.cartPhoto}>
                    <img src={mainImage} alt={title} />
                </div>
                <div className={styles.cartContent}>
                    <Link to={`/product/${id}`} className={styles.cartLink}>
                        <h4>{title}</h4>
                    </Link>
                    <p>{price}$</p>
                </div>
            </div>
            <div className={styles.cartControls}>
                {showControls ? (
                    <>
                        <div className={styles.addedControl}>
                            <button
                                onClick={handleDecreaseQuantity}
                                className={styles.cartButton}
                                disabled={cartQuantity <= 1}>
                                <img src={minusSmall} alt="Decrease quantity" />
                            </button>
                            <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}</p>
                            <button
                                onClick={handleIncreaseQuantity}
                                className={styles.cartButton}>
                                <img src={plusSmall} alt="Increase quantity" />
                            </button>
                        </div>
                        <button onClick={handleDelete} className={styles.deleteItem}>Delete</button>
                    </>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className={styles.addToCart}
                        aria-label="Add to Cart">
                        <img src={cart} alt="Add to Cart" />
                    </button>
                )}
            </div>
        </div>
    )
}
export default CartItem;
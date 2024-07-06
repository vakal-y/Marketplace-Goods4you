import styles from './CartItem.module.scss';
import { useState } from 'react';
import { Product } from '../../interfaces/types';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';

const CartItem: React.FC<{ product: Product }> = ({ product }) => {
    const { id, name, price, images } = product;
    const mainImage = images[1];
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
                    <img src={mainImage} alt={name} />
                </div>
                <div className={styles.cartContent}>
                    <Link to={`/product/${id}`} className={styles.cartLink}>
                        <h4>{name}</h4>
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
                                -
                            </button>
                            <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}</p>
                            <button
                                onClick={handleIncreaseQuantity}
                                className={styles.cartButton}>
                                +
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
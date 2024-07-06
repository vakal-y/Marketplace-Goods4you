import styles from './CartItem.module.scss';
import { useState } from 'react';
import { Product } from '../../interfaces/types';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';

const CartItem: React.FC<{ product: Product }> = ({ product }) => {
    const { id, name, price, images } = product;
    const mainImage = images[1];
    const [cartQuantity, setCartQuantity] = useState<number>(0);

    const handleAddToCart = () => {
        setCartQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleIncreaseQuantity = () => {
        setCartQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setCartQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    return (
        <div className={styles.cartItem}>
            <div className={styles.cartLeft}>
                <div className={styles.cartPhoto}>
                    <img src={mainImage} alt={name} />
                </div>
                <div className={styles.cartContent}>
                    <h4>{name}</h4>
                    <p>{price}$</p>
                </div>
            </div>
            <div className={styles.cartControls}>
                <div className={styles.addedControl}>
                    {cartQuantity < 0 ? (
                        <div
                            className={styles.cartControls}
                            aria-label={`${cartQuantity} items in cart`}>
                            <button
                                onClick={handleDecreaseQuantity}
                                className={styles.cartButton}>
                                -
                            </button>
                            <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}</p>
                            <button
                                onClick={handleIncreaseQuantity}
                                className={styles.cartButton}>
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className={styles.addToCart}
                            aria-label="Add to Cart">
                            <img src={cart} alt={name} />
                        </button>
                    )}</div>
                <button className={styles.delete}>Delete</button>
            </div>
        </div>
    )
}
export default CartItem;
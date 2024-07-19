import styles from './CartItem.module.scss';
import { useState, useEffect } from 'react';
import { Product } from '../../interfaces/types';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';
import minusSmall from '../../assets/minusSmall.svg';
import plusSmall from '../../assets/plusSmall.svg';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../slices/cartSlice';
import { RootState, AppDispatch } from '../../store/store';

const CartItem: React.FC<{ product: Product }> = ({ product }) => {
    const { id, title, price, thumbnail, quantity, stock } = product;
    const mainImage = thumbnail;
    const [cartQuantity, setCartQuantity] = useState<number>(quantity);
    const [showControls, setShowControls] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.auth.user?.id);

    useEffect(() => {
        setCartQuantity(quantity);
        setShowControls(quantity > 0);
    }, [quantity]);

    const handleAddToCart = async () => {
        try {
            await dispatch(updateCart({ userId: userId || 0, products: [{ ...product, quantity: 1 }] }));
            setCartQuantity(1);
            setShowControls(true);
        } catch (error) {
            console.error('Failed to update cart:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(updateCart({ userId: userId || 0, products: [{ ...product, quantity: 0 }] }));
            setShowControls(false);
        } catch (error) {
            console.error('Failed to update cart:', error);
        }
    };

    const handleIncreaseQuantity = async () => {
        if (cartQuantity < stock) {
            try {
                await dispatch(updateCart({ userId: userId || 0, products: [{ ...product, quantity: cartQuantity + 1 }] }));
                setCartQuantity(cartQuantity + 1);
            } catch (error) {
                console.error('Failed to update cart:', error);
                ``
            }
        }
    };

    const handleDecreaseQuantity = async () => {
        if (cartQuantity > 1) {
            try {
                await dispatch(updateCart({ userId: userId || 0, products: [{ ...product, quantity: cartQuantity - 1 }] }));
                setCartQuantity(cartQuantity - 1);
            } catch (error) {
                console.error('Failed to update cart:', error);
            }
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
                                className={`${styles.cartButton} ${cartQuantity <= 1 ? styles.disabled : ''}`}
                                disabled={cartQuantity <= 1}>
                                <img src={minusSmall} alt="Decrease quantity" />
                            </button>
                            <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}</p>
                            <button
                                onClick={handleIncreaseQuantity}
                                className={`${styles.cartButton} ${cartQuantity >= stock ? styles.disabled : ''}`}
                                disabled={cartQuantity >= stock}>
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
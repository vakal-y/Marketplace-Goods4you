import styles from './ProductCard.module.scss';
import { ProductCardProps } from '../../interfaces/types';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';
import minusSmall from '../../assets/minusSmall.svg';
import plusSmall from '../../assets/plusSmall.svg';
import ButtonAddToCart from '../../ui/ButtonAddToCart';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../interfaces/types';
import { checkProductInCart, selectProductQuantityInCart } from '../../slices/cartSlice';

const ProductCard: React.FC<ProductCardProps> = ({ product, onRemoveFromCart }) => {
    const { id, title, price, discountPercentage, thumbnail, stock } = product;
    const discountedPrice = (price - (price * discountPercentage / 100)).toFixed(2);
    const dispatch = useDispatch<AppDispatch>();
    const cartQuantity = useSelector((state: RootState) => selectProductQuantityInCart(state, product.id));

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(checkProductInCart({ productId: product.id }));
    };

    const handleIncreaseQuantity = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        if (cartQuantity < stock) {
            dispatch(checkProductInCart({ productId: product.id }));
        }
    };

    const handleDecreaseQuantity = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        onRemoveFromCart(product);
    };

    return (
        <div className={styles.productCard}
            role="article"
            aria-labelledby={`product-name-${id}`}
            aria-describedby={`product-price-${id}`}>
            <Link to={`/product/${id}`}
                className={styles.productLink}
                aria-label={`View details for ${title}`}>
                <div className={styles.productImage}>
                    <img src={thumbnail} alt={title} aria-describedby={`product-title-${id}`} />
                    <div className={styles.overlay}>
                        <span className={styles.detailsText}>Show details</span>
                    </div>
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productText}>
                        <h2 id={`product-name-${id}`}>{title}</h2>
                        <p id={`product-price-${id}`} aria-label={`Price: ${discountedPrice} dollars`}>
                            {discountedPrice} $
                        </p>
                    </div>
                    <div className={styles.addToCart}>
                        {cartQuantity > 0 ? (
                            <div className={styles.cartControls}>
                                <button
                                    onClick={handleDecreaseQuantity}
                                    className={styles.cartButton}>
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
                        ) : (
                            <ButtonAddToCart
                                size="small"
                                onClick={handleAddToCart}
                                ariaLabel={`Add ${title} to cart`}
                                className={styles.cardButton}
                                disabled={stock <= 0}
                            >
                                <img src={cart} alt="Add to cart" />
                            </ButtonAddToCart>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
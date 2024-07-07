import { useState } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../interfaces/types';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';
import minusSmall from '../../assets/minusSmall.svg';
import plusSmall from '../../assets/plusSmall.svg';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { id, name, price, images } = product;
    const mainImage = images[0];
    const [cartQuantity, setCartQuantity] = useState<number>(0);

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        setCartQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleIncreaseQuantity = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        setCartQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        setCartQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <div className={styles.productCard}
            role="article"
            aria-labelledby={`product-name-${id}`}
            aria-describedby={`product-price-${id}`}>
            <Link to="/product/1"
                className={styles.productLink}
                aria-label={`View details for ${name}`}>
                <div className={styles.productImage}>
                    <img src={mainImage} alt={name} aria-describedby={`product-title-${id}`} />
                    <div className={styles.overlay}>
                        <span className={styles.detailsText}>Show details</span>
                    </div>
                </div>
                <div className={styles.productInfo} onClick={handleClick}>
                    <div className={styles.productText}>
                        <h2 id={`product-name-${id}`}>{name}</h2>
                        <p id={`product-price-${id}`} aria-label={`Price: ${price} dollars`}>{price} $</p>
                    </div>
                    <div className={styles.addToCart}>
                        {
                            cartQuantity > 0 ? (
                                <div className={styles.cartControls}>
                                    <button
                                        onClick={handleDecreaseQuantity}
                                        className={styles.cartButton}>
                                        <img src={minusSmall} alt="Decrease quantity" />
                                    </button>
                                    <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}</p>
                                    <button
                                        onClick={handleIncreaseQuantity}
                                        className={styles.cartButton}>
                                        <img src={plusSmall} alt="Increase quantity" />
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleAddToCart} className={styles.cardButton} aria-label={`Add ${name} to cart`}>
                                    <img src={cart} alt={name} />
                                </button>
                            )
                        }
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
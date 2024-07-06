import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces/types';
import styles from './ProductPage.module.scss';
import starTrue from '../../assets/startrue.svg';
import starFalse from '../../assets/starfalse.svg';

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { id } = useParams<{ id: string }>();
    const [currentImage, setCurrentImage] = useState<string>('');
    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                const product = data.products.find((p: Product) => p.id === parseInt(id!, 10));
                if (product && product.images.length > 0) {
                    setCurrentImage(product.images[0]);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [id]);

    const product = products.find((product) => product.id === parseInt(id!, 10));

    if (!product) {
        navigate('*');
        return null;
    }

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
        <div
            className={styles.product}
            role="region"
            aria-labelledby="product-title">
            <section className={styles.productGallery}>
                <div className={styles.mainImage}>
                    <img src={currentImage} alt={product.name} />
                </div>
                <div className={styles.gallery}>
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            onClick={() => setCurrentImage(image)}
                            className={currentImage === image ? styles.activeThumbnail : ''}
                        />
                    ))}
                </div>
            </section>
            <section className={styles.productDescription}>
                <h2 id="product-title">{product.name}</h2>
                <div
                    className={styles.productRateDescription}
                    aria-label="Product rating and category">
                    <div className={styles.productRate}>
                        <img src={starTrue} alt="starTrue" />
                        <img src={starTrue} alt="starTrue" />
                        <img src={starTrue} alt="starTrue" />
                        <img src={starTrue} alt="starTrue" />
                        <img src={starFalse} alt="starTrue" />
                    </div>
                    <p>{product.category}</p>
                </div>
                <p
                    className={styles.inStock}
                    aria-label={`In Stock - Only ${product.quantity} left`}>
                    In Stock - Only {product.quantity} left!
                </p>
                <p
                    className={styles.productDescriptionText}
                    aria-describedby="product-description">
                    {product.description}
                </p>
                <div
                    className={styles.warrantyNships}
                    aria-label="Product warranty and shipping details">
                    <p>{product.warranty} month warranty</p>
                    <p>Ships in {product.ships} month</p>
                </div>
                <div className={styles.productBuy}>
                    <div className={styles.productPriceInfo}>
                        <div className={styles.productPrices}>
                            <p
                                className={styles.productDiscountPrice}
                                aria-label={`Discounted price: ${product.price}$`}>
                                {product.price}$
                            </p>
                            <p
                                className={styles.productPrice}
                                aria-label="Original price: 9.99$">
                                9.99$
                            </p>
                        </div>
                        <p
                            className={styles.productPersonalDiscount}
                            aria-label="Your discount: 14.5%">
                            Your discount: <b>14.5%</b>
                        </p>
                    </div>
                    {cartQuantity > 0 ? (
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
                            className={styles.productAddToCart}
                            aria-label="Add to Cart">
                            Add to Cart
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
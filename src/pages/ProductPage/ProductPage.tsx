import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces/types';
import styles from './ProductPage.module.scss';
import starTrue from '../../assets/startrue.svg';
import starFalse from '../../assets/starfalse.svg';
import minusBig from '../../assets/minusBig.svg';
import plusBig from '../../assets/plusBig.svg';
import ButtonAddToCart from '../../ui/ButtonAddToCart';

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams<{ id: string }>();
    const [currentImage, setCurrentImage] = useState<string>('');
    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setCurrentImage(data.thumbnail);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                navigate('/404');
            });
    }, [id, navigate]);

    useEffect(() => {
        if (product) {
            document.title = `${product.title} | Goods4you`;
        }
    }, [product]);

    const handleAddToCart = () => {
        setCartQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleIncreaseQuantity = () => {
        setCartQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setCartQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    const handleThumbnailClick = (image: string) => {
        setCurrentImage(image);
    };

    if (!product) {
        navigate('*');
        return null;
    }

    return (
        <div className={styles.product} role="region" aria-labelledby="product-title">
            <Helmet>
                <title>{product.title} | Goods4you</title>
                <meta name="description" content="Any products from famous brands with worldwide delivery" />
            </Helmet>
            <section className={styles.productGallery}>
                <div className={styles.mainImage}>
                    <img src={currentImage} alt={product.title} />
                </div>

                {product.images.length > 1 && (
                    <div className={styles.gallery}>
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.title} ${index + 1}`}
                                onClick={() => handleThumbnailClick(image)}
                                className={currentImage === image ? styles.activeThumbnail : ''}
                            />
                        ))}
                    </div>
                )}

            </section>
            <section className={styles.productDescription}>
                <h2 id="product-title">{product.title}</h2>
                <div className={styles.productRateDescription} aria-label="Product rating and category">
                    <div className={styles.productRate}>
                        {Array.from({ length: Math.round(product.rating) }, (_, index) => (
                            <img key={index} src={starTrue} alt="starTrue" />
                        ))}
                        {Array.from({ length: 5 - Math.round(product.rating) }, (_, index) => (
                            <img key={index} src={starFalse} alt="starFalse" />
                        ))}
                    </div>
                    <p>{product.category}</p>
                </div>
                <p className={styles.inStock} aria-label={product.availabilityStatus}>
                    {product.availabilityStatus}
                </p>
                <p className={styles.productDescriptionText} aria-describedby="product-description">
                    {product.description}
                </p>
                <div className={styles.warrantyNships} aria-label="Product warranty and shipping details">
                    <p>{product.warrantyInformation}</p>
                    <p>{product.shippingInformation}</p>
                </div>
                <div className={styles.productBuy}>
                    <div className={styles.productPriceInfo}>
                        <div className={styles.productPrices}>
                            <p className={styles.productDiscountPrice} aria-label={`Discounted price: ${product.price}$`}>
                                {(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}$
                            </p>
                            <p className={styles.productPrice} aria-label={`Original price: ${product.price}$`}>
                                {product.price}$
                            </p>
                        </div>
                        <p className={styles.productPersonalDiscount} aria-label="{product.discountPercentage}%">
                            Your discount: <b>{product.discountPercentage}%</b>
                        </p>
                        <div className={styles.productButtons}>
                            {cartQuantity > 0 ? (
                                <div className={styles.cartControls} aria-label={`${cartQuantity} items in cart`}>
                                    <button onClick={handleDecreaseQuantity} className={styles.cartButton}>
                                        <img src={minusBig} alt="Decrease quantity" />
                                    </button>
                                    <p>
                                        {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}
                                    </p>
                                    <button onClick={handleIncreaseQuantity} className={styles.cartButton}>
                                        <img src={plusBig} alt="Increase quantity" />
                                    </button>
                                </div>
                            ) : (
                                <ButtonAddToCart onClick={handleAddToCart} size="large">Add to Cart</ButtonAddToCart>
                            )}
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default ProductPage;
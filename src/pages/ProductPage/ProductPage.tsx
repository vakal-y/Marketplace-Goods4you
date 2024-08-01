import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, } from '../../interfaces/types';
import { updateCart, selectCartItems } from '../../slices/cartSlice';
import { useGetProductByIdQuery } from '../../slices/apiSlice';
import styles from './ProductPage.module.scss';
import starTrue from '../../assets/startrue.svg';
import starFalse from '../../assets/starfalse.svg';
import minusBig from '../../assets/minusBig.svg';
import plusBig from '../../assets/plusBig.svg';
import ButtonAddToCart from '../../ui/ButtonAddToCart';

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const cartItems = useSelector((state: RootState) => selectCartItems(state));

    const { data: product, isLoading, isError } = useGetProductByIdQuery(id || '');
    const [currentImage, setCurrentImage] = useState<string>('');

    const cartQuantity = cartItems.find(item => item.id === product?.id)?.quantity || 0;

    useEffect(() => {
        if (product) {
            document.title = `${product.title} | Goods4you`;
            setCurrentImage(product.thumbnail);
        }
    }, [product]);

    const updateCartQuantity = (newQuantity: number) => {
        if (product && userId) {
            if (newQuantity <= 0) {
                dispatch(updateCart({
                    userId,
                    products: cartItems.filter(item => item.id !== product.id)
                }));
            } else {
                dispatch(updateCart({
                    userId,
                    products: cartItems.map(item =>
                        item.id === product.id ? { ...item, quantity: newQuantity } : item
                    )
                }));
            }
        }
    };

    const handleAddToCart = () => {
        if (product && userId) {
            if (cartQuantity === 0) {
                updateCartQuantity(1);
            } else {
                updateCartQuantity(cartQuantity + 1);
            }
        }
    };

    const handleIncreaseQuantity = () => {
        if (product) {
            updateCartQuantity(cartQuantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (cartQuantity > 0) {
            updateCartQuantity(cartQuantity - 1);
        }
    };

    const handleThumbnailClick = (image: string) => {
        setCurrentImage(image);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !product) {
        navigate('*');
        return null;
    }

    const showAddToCartButton = cartQuantity === 0;

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
                            {showAddToCartButton ? (
                                <ButtonAddToCart onClick={handleAddToCart} size="large">Add to Cart</ButtonAddToCart>
                            ) : (
                                <div className={styles.cartControls} aria-label={`${cartQuantity} items in cart`}>
                                    <button onClick={handleDecreaseQuantity} className={styles.cartButton} disabled={cartQuantity <= 0}>
                                        <img src={minusBig} alt="Decrease quantity" />
                                    </button>
                                    <p>
                                        {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}
                                    </p>
                                    <button onClick={handleIncreaseQuantity} className={styles.cartButton}>
                                        <img src={plusBig} alt="Increase quantity" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default ProductPage;
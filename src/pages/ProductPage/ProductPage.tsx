import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../interfaces/types';
import styles from './ProductPage.module.scss';
import starTrue from '../../assets/startrue.svg';
import starFalse from '../../assets/starfalse.svg';

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { id } = useParams<{ id: string }>();
    const [currentImage, setCurrentImage] = useState<string>('');
    const [cartQuantity, setCartQuantity] = useState<number>(0);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                const product = data.products.find((p: Product) => p.id === parseInt(id, 10));
                if (product && product.images.length > 0) {
                    setCurrentImage(product.images[0]);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [id]);

    const product = products.find((product) => product.id === parseInt(id, 10));

    if (!product) {
        return <div>Product not found</div>;
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
        <div className={styles.product}>
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
                <h2>{product.name}</h2>
                <div className={styles.productRateDescription}>
                    <div className={styles.productRate}>
                        <img src={starTrue} alt="starTrue" />
                        <img src={starTrue} alt="starTrue" />
                        <img src={starTrue} alt="starTrue" />
                        <img src={starTrue} alt="starTrue" />
                        <img src={starTrue} alt="starTrue" />
                    </div>
                    <p>{product.category}</p>
                </div>
                <p className={styles.inStock}>In Stock - Only {product.quantity} left!</p>
                <p className={styles.productDescriptionText}>{product.description}</p>
                <div className={styles.warrantyNships}>
                    <p>{product.warranty} month warranty</p>
                    <p>Ships in {product.ships} month</p>
                </div>
                <div className={styles.productBuy}>
                    <div className={styles.productPriceInfo}>
                        <div className={styles.productPrices}>
                            <p className={styles.productDiscountPrice}>{product.price}$</p>
                            <p className={styles.productPrice}>9.99$</p>
                        </div>
                        <p className={styles.productPersonalDiscount}>Your discount: <b>14.5%</b></p>
                    </div>
                    {cartQuantity > 0 ? (
                        <div className={styles.cartControls}>
                            <button onClick={handleDecreaseQuantity} className={styles.cartButton}>-</button>
                            <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}</p>
                            <button onClick={handleIncreaseQuantity} className={styles.cartButton}>+</button>
                        </div>
                    ) : (
                        <button onClick={handleAddToCart} className={styles.productAddToCart}>Add to Cart</button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
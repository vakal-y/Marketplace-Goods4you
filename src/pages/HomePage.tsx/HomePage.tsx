import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Product, RootState, ScrollToSectionProps, AppDispatch } from '../../interfaces/types';
import ProductCard from '../../components/ProductCard/ProductCard';
import { debounce } from 'lodash';
import Accordion from '../../ui/Accordion';
import { useSearchProductsQuery } from '../../slices/apiSlice';
import { updateCart } from '../../slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

const HomePage: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [limit] = useState<number>(12);
    const [skip, setSkip] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const userId = useSelector((state: RootState) => state.auth.user?.id);

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const { data, error, isLoading } = useSearchProductsQuery({ q: searchQuery, limit, skip });

    useEffect(() => {
        if (data?.products) {
            setAllProducts(prevProducts => [...prevProducts, ...data.products]);
        }
    }, [data]);

    const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setSkip(0);
        setAllProducts([]);
    }, 300);

    const loadMoreProducts = () => {
        setSkip(prevSkip => prevSkip + limit);
    };

    const showLoadMoreButton = data && allProducts.length < data.total;

    const handleAddToCart = (product: Product) => {
        if (userId) {
            const existingProduct = cartItems.find(item => item.id === product.id);
            const updatedItems = existingProduct
                ? cartItems.map(item => item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item)
                : [...cartItems, { ...product, quantity: 1 }];

            dispatch(updateCart({ userId, products: updatedItems }));
        }
    };

    const handleRemoveFromCart = (product: Product) => {
        if (userId) {
            const updatedItems = cartItems
                .map(item => item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item)
                .filter(item => item.quantity > 0);

            dispatch(updateCart({ userId, products: updatedItems }));
        }
    };

    return (
        <div className={styles.homePage}>
            <Helmet>
                <title>Catalog | Goods4you</title>
                <meta name="description" content="Any products from famous brands with worldwide delivery" />
            </Helmet>
            <section id="home" className={styles.home}>
                <div className={styles.homeContent}
                    aria-labelledby="main-title"
                    aria-describedby="main-description">
                    <h1 id="main-title">Goods4you</h1>
                    <h3 id="sub-title" aria-describedby="main-description">Any products from famous brands<br />with worldwide delivery</h3>
                    <p id="main-description">We sell smartphones, laptops, clothes, shoes<br />and many other products at low prices</p>
                    <Link
                        to="/#catalog"
                        onClick={() => scrollToSection('catalog')}
                        className={styles.shopping}
                        role="button"
                        aria-label="Go to catalog section">
                        Go to shopping
                    </Link>
                </div>
            </section>
            <section id="catalog" className={styles.catalog} aria-labelledby="catalog-heading">
                <h2 id="catalog-heading">Catalog</h2>
                <form action="" className={styles.search}>
                    <label htmlFor="search-input" className="visually-hidden"></label>
                    <input id="search-input" type="text" placeholder="Search by title" aria-label="Search by title" onChange={handleSearch} />
                </form>
                <div className={styles.cards} role="list" aria-label="Product list">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error loading products.</p>}
                    {allProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={() => handleAddToCart(product)}
                            onRemoveFromCart={() => handleRemoveFromCart(product)}
                        />
                    ))}
                </div>
                {showLoadMoreButton && (
                    <button className={styles.button} onClick={loadMoreProducts} aria-label="Show more products" aria-controls="catalog">
                        Show more
                    </button>
                )}
            </section>
            <section id="faq" className={styles.faq} aria-labelledby="faq-heading">
                <div className={styles.faqContent}>
                    <h2 id="faq-heading">FAQ</h2>
                    <Accordion />
                </div>
            </section>
        </div>
    );
};


export default HomePage;
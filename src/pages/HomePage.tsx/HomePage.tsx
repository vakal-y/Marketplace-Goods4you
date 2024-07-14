import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/types';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ScrollToSectionProps } from '../../interfaces/types';
import { debounce } from 'lodash';
import { useSearchProductsQuery } from '../../slices/apiSlice';
import Accordion from '../../ui/Accordion';


const HomePage: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [limit, setLimit] = useState<number>(12);
    const [skip, setSkip] = useState<number>(0);

    const [cart, setCart] = useState<{ [key: number]: number }>({});

    // Хранение всех загруженных товаров
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    // Получение данных с помощью RTK Query
    const { data, error, isLoading } = useSearchProductsQuery({ q: searchQuery, limit, skip });

    // Обновление списка товаров при загрузке новых данных
    useEffect(() => {
        if (data?.products) {
            setAllProducts(prevProducts => [...prevProducts, ...data.products]);
        }
    }, [data]);

    const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setSkip(0);
        setAllProducts([]); // Очистка всех загруженных товаров при поиске
    });

    const loadMoreProducts = () => {
        setSkip(prevSkip => prevSkip + limit);
    };


    const handleAddToCart = (productId: number) => {
        setCart(prevCart => ({
            ...prevCart,
            [productId]: (prevCart[productId] || 0) + 1
        }));
    };

    const handleRemoveFromCart = (productId: number) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[productId] > 1) {
                newCart[productId]--;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    const showLoadMoreButton = data && allProducts.length < data.total;

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
                            cartQuantity={cart[product.id] || 0}
                            onAddToCart={() => handleAddToCart(product.id)}
                            onRemoveFromCart={() => handleRemoveFromCart(product.id)}
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
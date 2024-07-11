import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/types';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ScrollToSectionProps } from '../../interfaces/types';
import { debounce } from 'lodash';
import { useSearchProductsQuery } from '../../slices/apiSlice';


const HomePage: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [limit, setLimit] = useState<number>(12);
    const [skip, setSkip] = useState<number>(0);
    const [faqOpen, setFaqOpen] = useState<number[]>([]);
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

    const toggleFaq = (index: number) => {
        setFaqOpen(prevOpen =>
            prevOpen.includes(index)
                ? prevOpen.filter(i => i !== index)
                : [...prevOpen, index]
        );
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
                {data && data.products.length < data.total && (
                    <button className={styles.button} onClick={loadMoreProducts} aria-label="Show more products" aria-controls="catalog">
                        Show more
                    </button>
                )}
            </section>
            <section id="faq" className={styles.faq} aria-labelledby="faq-heading">
                <div className={styles.faqContent}>
                    <h2 id="faq-heading">FAQ</h2>
                    <div>
                        {[{
                            id: 1, question: 'How can I track the status of my order?',
                            answer: 'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.'
                        }, {
                            id: 2, question: 'What payment methods do you accept?',
                            answer: 'We accept various payment methods including credit cards, PayPal, and other online payment services. You can choose the most convenient method during the checkout process.'
                        }, {
                            id: 3, question: 'How can I return or exchange an item?',
                            answer: 'If you are not satisfied with your purchase, you can return or exchange the item within 30 days of receipt. Please visit our Returns & Exchanges page for detailed instructions.'
                        }].map(({ id, question, answer }) => (
                            <div key={id} className={styles.faqItem}>
                                <div
                                    className={`${styles.faqHeader} ${faqOpen.includes(id) ? styles.open : ''}`}
                                    onClick={() => toggleFaq(id)}
                                    aria-expanded={faqOpen.includes(id)}
                                    aria-controls={`faq-answer-${id}`}
                                    id={`faq-question-${id}`}
                                >
                                    <h3>{question}</h3>
                                    <span className={`${styles.icon} ${faqOpen.includes(id) ? styles.open : ''}`}></span>
                                </div>
                                <div
                                    className={`${styles.faqContentInner} ${faqOpen.includes(id) ? styles.open : ''}`}
                                    id={`faq-answer-${id}`}
                                    aria-labelledby={`faq-question-${id}`}
                                >
                                    <p>{answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};


export default HomePage;
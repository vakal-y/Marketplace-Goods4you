import { useState, useEffect } from 'react';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/types';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ScrollToSectionProps } from '../../interfaces/types';


const HomePage: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const [products, setProducts] = useState<Product[]>([]);
    // const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [faqOpen, setFaqOpen] = useState<number[]>([]);

    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
            .catch((e) => console.error('Error fetching data:', e))
    }, []);

    const loadMoreProducts = () => {
        setPerPage(perPage + 12);
    };

    const toggleFaq = (index: number) => {
        setFaqOpen((prevOpen) =>
            prevOpen.includes(index)
                ? prevOpen.filter((i) => i !== index)
                : [...prevOpen, index]
        );
    };

    return (
        <div className={styles.homePage}>
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
                    <input id="search-input" type="text" placeholder="Search by title" aria-label="Search by title" />
                </form>
                <div className={styles.cards} role="list" aria-label="Product list">
                    {products.slice(0, perPage).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {perPage < products.length && (
                    <button className={styles.button}
                        onClick={loadMoreProducts}
                        aria-label="Show more products"
                        aria-controls="catalog">
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
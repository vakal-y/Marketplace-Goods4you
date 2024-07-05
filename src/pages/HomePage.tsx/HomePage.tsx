import { useState, useEffect } from 'react';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/types';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ScrollToSectionProps } from '../../interfaces/types';


const HomePage: React.FC<ScrollToSectionProps> = ({ scrollToSection }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
            .catch((e) => console.error('Error fetching data:', e))
    }, []);

    const loadMoreProducts = () => {
        setPerPage(perPage + 12);
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
            <section id="faq" className={styles.faq}>
                <div className={styles.faqContent}>
                    <h2>FAQ</h2>
                    <div>
                        <h3>How can I track the status of my order?</h3>
                        <p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
                        <h3>What payment methods do you accept?</h3>
                        <p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
                        <h3>How can I return or exchange an item?</h3>
                        <p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default HomePage;
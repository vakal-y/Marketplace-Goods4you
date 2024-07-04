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
                <h1>Goods4you</h1>
                <h3>Any products from famous brands<br />with worldwide delivery</h3>
                <p>We sell smartphones, laptops, clothes, shoes<br />and many other products at low prices</p>
                <Link to="/#catalog" onClick={() => scrollToSection('catalog')} className={styles.shopping}>Go to shopping</Link>
            </section>
            <section id="catalog" className={styles.catalog}>
                <h2>Catalog</h2>
                <form action="" className={styles.search}>
                    <input type="text" placeholder='Search by title' />
                </form>
                <div className={styles.cards}>
                    {products.slice(0, perPage).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {perPage < products.length && (
                    <button className={styles.button} onClick={loadMoreProducts}>Show more</button>
                )}
            </section>
            <section id="faq" className={styles.faq}>
                <h2>FAQ</h2>
            </section>
        </div>
    );
};

export default HomePage;
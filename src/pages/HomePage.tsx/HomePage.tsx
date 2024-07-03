import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
    return (
        <div className={styles.home}>
            <h1>Home Page</h1>
            <section id="catalog" className={styles.catalog}>
                <h2>Catalog</h2>
                <button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>Go to shopping</button>
            </section>
            <section id="faq" className={styles.faq}>
                <h2>FAQ</h2>
            </section>
        </div>
    );
};

export default HomePage;
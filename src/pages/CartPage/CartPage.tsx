import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Product } from '../../interfaces/types';
import styles from './CartPage.module.scss';
import CartItem from '../../components/CartItem/CartItem';

const Cart: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products.slice(0, 4));
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={styles.cartPage} aria-label="Shopping Cart Page">
            <Helmet>
                <title>My cart | Goods4you</title>
                <meta name="description" content="Any products from famous brands with worldwide delivery" />
            </Helmet>
            <h2>My cart</h2>
            <div className={styles.cartContent}>
                <section className={styles.cartForm} aria-label="Cart Items">
                    {products.map((product) => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </section>
                <section className={styles.cartTotal} aria-label="Cart Summary">
                    <div className={styles.cartCount} aria-label="Total Items Count">
                        <div className={styles.count} aria-labelledby="total-items">
                            <h5 id="total-items">Total count</h5>
                            <p aria-live="polite">3 items</p>
                        </div>
                        <div className={styles.price} aria-labelledby="price-without-discount">
                            <h4 id="price-without-discount">Price without discount</h4>
                            <p aria-live="polite">700$</p>
                        </div>
                    </div>
                    <div className={styles.cartTotalPrice} aria-labelledby="total-price">
                        <h3 id="total-price">Total price</h3>
                        <p aria-live="polite">590$</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Cart;
import React, { useState, useEffect } from 'react';
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
        <div className={styles.cartPage}>
            <h2>My cart</h2>
            <div className={styles.cartContent}>
                <section className={styles.cartForm}>{products.map((product) => (
                    <CartItem key={product.id} product={product} />
                ))}</section>
                <section className={styles.cartTotal}>
                    <div className={styles.cartCount}>
                        <div className={styles.count}>
                            <h5>Total count</h5>
                            <p>3 items</p>
                        </div>
                        <div className={styles.price}>
                            <h4>Price without discount</h4>
                            <p>700$</p>
                        </div>
                    </div>
                    <div className={styles.cartTotalPrice}>
                        <h3>Total price</h3>
                        <p>590$</p>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Cart;
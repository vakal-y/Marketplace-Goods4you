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
        <div className={styles.cart}>
            {products.map((product) => (
                <CartItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Cart;
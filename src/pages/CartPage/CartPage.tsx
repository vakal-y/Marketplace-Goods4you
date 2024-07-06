import React, { useState, useEffect } from 'react';
import { Product } from '../../interfaces/types';
import styles from './CartPage.module.scss';
import CartItem from '../../components/CartItem/CartItem';

const Cart: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentImage, setCurrentImage] = useState<string>('');
    const [id, setId] = useState<string>('');

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                const product = data.products.find((p: Product) => p.id === parseInt(id!, 10));
                if (product && product.images.length > 0) {
                    setCurrentImage(product.images[0]);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [id]);

    const product = products.find((product) => product.id === parseInt(id!, 10));

    return (
        <div className={styles.cart}>
            {products.map((product) => (
                <CartItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Cart;
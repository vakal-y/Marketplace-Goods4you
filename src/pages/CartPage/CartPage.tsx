import React, { useState } from 'react';
import { Product } from '../../interfaces/types';
import styles from './CartPage.module.scss';

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>([
        {
            id: 1,
            name: "Sneakers",
            price: 100,
            image: "/path/to/image.jpg",
            quantity: 1
        }
    ]);

    const handleRemoveItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className={styles.cart}>
            <h1>Корзина товаров</h1>
            {cartItems.length === 0 ? (
                <p>Ваша корзина пуста</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                            <div className={styles.cartItemDetails}>
                                <h2>{item.name}</h2>
                                <p>{item.price}$</p>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                    min="1"
                                />
                                <button onClick={() => handleRemoveItem(item.id)}>Удалить</button>
                            </div>
                        </div>
                    ))}
                    <div className={styles.total}>
                        <h2>Итого: {totalPrice}$</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
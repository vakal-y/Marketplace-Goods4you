import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import styles from './CartPage.module.scss';
import CartItem from '../../components/CartItem/CartItem';
import { fetchCart, selectCartItems, selectCartStatus, selectCartError } from '../../slices/cartSlice';
import { useAppDispatch } from '../../helpers/hook';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useSelector(selectCartItems);
    const cartStatus = useSelector(selectCartStatus);
    const cartError = useSelector(selectCartError);
    const userId = '33';

    useEffect(() => {
        if (cartStatus === 'idle') {
            dispatch(fetchCart(userId));
        }
    }, [cartStatus, dispatch]);

    return (
        <div className={styles.cartPage} aria-label="Shopping Cart Page">
            <Helmet>
                <title>My cart | Goods4you</title>
                <meta name="description" content="Any products from famous brands with worldwide delivery" />
            </Helmet>
            <h2>My cart</h2>
            <div className={styles.cartContent}>
                {cartStatus === 'loading' ? (
                    <p className={styles.status}>Loading...</p>
                ) : cartStatus === 'failed' ? (
                    <p className={styles.status}>Failed to load cart: {cartError}</p>
                ) : products.length === 0 ? (
                    <p className={styles.status}>No items</p>
                ) : (
                    <>
                        <section className={styles.cartForm} aria-label="Cart Items">
                            {products.map((product: any) => (
                                <CartItem key={product.id} product={product} />
                            ))}
                        </section>
                        <section className={styles.cartTotal} aria-labelledby="Cart Summary">
                            <div className={styles.cartCount} aria-label="Total Items Count">
                                <div className={styles.count} aria-labelledby="total-items">
                                    <h5 id="total-items">Total count</h5>
                                    <p aria-live="polite">{products.reduce((acc: any, product: any) => acc + product.quantity, 0)} items</p>
                                </div>
                                <div className={styles.price} aria-labelledby="price-without-discount">
                                    <h4 id="price-without-discount">Price without discount</h4>
                                    <p aria-live="polite">{products.reduce((acc: any, product: any) => acc + product.price * product.quantity, 0).toFixed(2)}$</p>
                                </div>
                            </div>
                            <div className={styles.cartTotalPrice} aria-labelledby="total-price">
                                <h3 id="total-price">Total price</h3>
                                <p aria-live="polite">{products.reduce((acc: any, product: any) => acc + product.price * product.quantity * (1 - product.discountPercentage / 100), 0).toFixed(2)}$</p>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
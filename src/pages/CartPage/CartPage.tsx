import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../interfaces/types';
import { Product } from '../../interfaces/types';
import styles from './CartPage.module.scss';
import CartItem from '../../components/CartItem/CartItem';
import { useGetCartByUserIdQuery, FetchBaseQueryError } from '../../slices/apiSlice';
import { fetchCart } from '../../slices/cartSlice';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.cart.items);
    const cartStatus = useSelector((state: RootState) => state.cart.status);
    const userId = '5';

    const { data: cartData, error: cartError, isLoading: cartLoading } = useGetCartByUserIdQuery(userId) as {
        data: Product[] | undefined;
        error: FetchBaseQueryError | null;
        isLoading: boolean;
    };

    useEffect(() => {
        if (cartStatus === 'idle') {
            dispatch<any>(fetchCart(userId));
        }
    }, [cartStatus, dispatch]);

    if (cartStatus === 'loading') {
        return <p>Loadimg...</p>;
    };

    if (cartStatus === 'failed') {
        return <p>Failed to load cart.</p>
    }

    //     fetch('/data.json')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setProducts(data.products.slice(0, 4));
    //         })
    //         .catch((error) => console.error('Error fetching data:', error));
    // }, []);

    return (
        <div className={styles.cartPage} aria-label="Shopping Cart Page">
            <Helmet>
                <title>My cart | Goods4you</title>
                <meta name="description" content="Any products from famous brands with worldwide delivery" />
            </Helmet>
            <h2>My cart</h2>
            <div className={styles.cartContent}>
                <section className={styles.cartForm} aria-label="Cart Items">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <CartItem key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </section>
                <section className={styles.cartTotal} aria-label="Cart Summary">
                    <div className={styles.cartCount} aria-label="Total Items Count">
                        <div className={styles.count} aria-labelledby="total-items">
                            <h5 id="total-items">Total count</h5>
                            <p aria-live="polite">{products.reduce((acc, product) => acc + product.quantity, 0)} items</p>
                        </div>
                        <div className={styles.price} aria-labelledby="price-without-discount">
                            <h4 id="price-without-discount">Price without discount</h4>
                            <p aria-live="polite">{products.reduce((acc, product) => acc + product.price * product.quantity, 0)}$</p>
                        </div>
                    </div>
                    <div className={styles.cartTotalPrice} aria-labelledby="total-price">
                        <h3 id="total-price">Total price</h3>
                        <p aria-live="polite">{products.reduce((acc, product) => acc + product.price * product.quantity * (1 - product.discountPercentage / 100), 0).toFixed(2)}$</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Cart;
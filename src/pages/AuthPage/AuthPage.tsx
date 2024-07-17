import { useState } from 'react';
import styles from './AuthPage.module.scss';
import { Helmet } from 'react-helmet-async';

const AuthPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, expiresInMins: 30 }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className={styles.authPage}>
            <Helmet>
                <title>Sign in | Goods4you</title>
                <meta name="description" content="Any products from famous brands with worldwide delivery" />
            </Helmet>
            <section id='login' className={styles.authContent}>
                <h1>Sign in</h1>
                <form onSubmit={handleLogin} className={styles.authForm}>
                    <input
                        type="text"
                        placeholder='Login'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign in</button>
                </form>
            </section>
        </div>
    )
}

export default AuthPage;
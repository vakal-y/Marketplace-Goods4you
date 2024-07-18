import { useState, useEffect } from 'react';
import styles from './AuthPage.module.scss';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../../slices/authSlice';
import { useLoginUserMutation, useGetCurrentUserQuery } from '../../services/authApi';


const AuthPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
    const { data: currentUser, refetch } = useGetCurrentUserQuery(undefined, {
        skip: !localStorage.getItem('token'),
    });

    useEffect(() => {
        if (currentUser) {
            dispatch(setUser(currentUser));
        }
    }, [currentUser, dispatch]);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await loginUser({ username, password }).unwrap();
            dispatch(setToken(result.token));
            refetch();
            navigate('/');
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };


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
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error && 'data' in error ? (error.data as { message: string }).message : 'Unknown error'}</p>}
                {currentUser && <p>Welcome, {currentUser.username}!</p>}
            </section>
        </div>
    )
}

export default AuthPage;
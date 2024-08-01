import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return token ? <>{children}</> : null;
};

export default ProtectedRoute;
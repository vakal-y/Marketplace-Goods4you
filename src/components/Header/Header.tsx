import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
        </header>
    );
};

export default Header;
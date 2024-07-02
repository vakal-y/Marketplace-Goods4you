import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
        </footer>
    );
};

export default Footer;
import './NotFoundPage.scss';
import { Helmet } from 'react-helmet-async';

const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found-page" aria-labelledby="not-found-title">
            <Helmet>
                <title>Page not found | Goods4you</title>
                <meta name="description" content="Any products from famous brands with worldwide delivery" />
            </Helmet>
            <h2 id="not-found-title"><span className='red'>404</span> - Page Not Found</h2>
        </div>
    );
};

export default NotFoundPage;
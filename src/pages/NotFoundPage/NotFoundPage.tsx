import './NotFoundPage.scss'

const NotFoundPage: React.FC = () => {
    return (
        <section className="not-found-page" aria-labelledby="not-found-title">
            <h2 id="not-found-title"><span className='red'>404</span> - Page Not Found</h2>
        </section>
    );
};

export default NotFoundPage;
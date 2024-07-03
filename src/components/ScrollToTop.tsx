import { useLocation } from 'react-router-dom';
import React from 'react';

const ScrollToTop: React.FC = () => {
    const { pathname, hash } = useLocation();
    React.useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
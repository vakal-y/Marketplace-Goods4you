import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../interfaces/types';

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductPage;
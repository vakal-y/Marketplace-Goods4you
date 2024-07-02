import './ProductCard.scss'
interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{price}$</p>
        </div>
    );
};

export default ProductCard;
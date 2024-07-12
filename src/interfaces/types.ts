import { store } from "../store/store";

export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
    availabilityStatus: string;
    total: number;
    discountPercentage: number;
    discountTotal: number;
    description: string;
    warrantyInformation: string;
    shippingInformation: string;
    rating: number;
    category: string;
    images: string[];
    tags: string[];
}

export type ScrollToSectionFunction = (id: string) => void;

export interface ScrollToSectionProps {
    scrollToSection: ScrollToSectionFunction;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface CartState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface ProductCardProps {
    product: Product;
    cartQuantity: number;
    onAddToCart: () => void;
    onRemoveFromCart: () => void;
}

export interface ButtonAddToCartProps {
    onClick: () => void;
}
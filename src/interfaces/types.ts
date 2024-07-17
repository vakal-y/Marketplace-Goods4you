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
    size: 'large' | 'small';
    children?: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    icon?: string;
    title?: string;
    className?: string;
    ariaLabel?: string;
}

export interface LogoProps {
    scrollToSection: ScrollToSectionFunction;
}

export interface AccordionProps {
    faqs?: {
        id: number;
        question: string;
        answer: string;
    }[];
}

export interface AuthState {
    user: any;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
import store from "../store/store";

export interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    description: string;
    warranty: number;
    ships: number;
    rate: number;
    quantity: number;
    category: string;
}

export type ScrollToSectionFunction = (id: string) => void;

export interface ScrollToSectionProps {
    scrollToSection: ScrollToSectionFunction;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface CartState {
    items: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
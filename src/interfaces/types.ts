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
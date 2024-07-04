export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export type ScrollToSectionFunction = (id: string) => void;

export interface ScrollToSectionProps {
    scrollToSection: ScrollToSectionFunction;
}
import { ScrollToSectionFunction } from '../interfaces/types';

export const scrollToSection: ScrollToSectionFunction = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
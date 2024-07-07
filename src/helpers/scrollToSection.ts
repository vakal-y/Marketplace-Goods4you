import { ScrollToSectionFunction } from '../interfaces/types';

export const scrollToSection: ScrollToSectionFunction = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
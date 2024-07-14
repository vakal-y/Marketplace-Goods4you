import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import { ScrollToSectionProps } from '../../interfaces/types';

const meta: Meta<typeof Footer> = {
    title: 'components/Footer',
    tags: ['autodocs'],
    component: Footer,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;

type StoryType = StoryFn<ScrollToSectionProps>;

export const Default: StoryType = (args) => (
    <Footer {...args} />
);

Default.args = {
    scrollToSection: (section: string) => console.log(`Scrolling to ${section}`),
};
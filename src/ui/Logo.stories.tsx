import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
    title: 'ui/Logo',
    component: Logo,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    argTypes: {
        scrollToSection: { action: 'scrollToSection clicked' },
    },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const NormalState: Story = {
    args: {
        scrollToSection: (section: string) => console.log(`Scrolling to ${section}`),
    },
    parameters: {
        backgrounds: {
            default: 'purple dark',
            values: [
                { name: 'grey dark', value: 'rgb(68, 75, 88)' },
                { name: 'purple dark', value: 'rgb(72, 66, 131)' }
            ]
        },
    },
};

export const HoverState: Story = {
    args: {
        scrollToSection: (section: string) => console.log(`Scrolling to ${section}`),
    },
    parameters: {
        pseudo: { hover: true },
        backgrounds: {
            default: 'purple dark',
        },
    },
};


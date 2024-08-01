import type { Meta, StoryObj } from "@storybook/react";
import ButtonAddToCart from "./ButtonAddToCart";
import cartIcon from '../assets/cart.svg';

const meta: Meta<typeof ButtonAddToCart> = {
    title: 'ui/ButtonAddToCart',
    component: ButtonAddToCart,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonAddToCart>;

export const Primary: Story = {
    args: {
        size: 'large',
        children: 'Add to Cart',
        onClick: () => alert('Added to cart!'),
    },
};

export const PrimarySmallWithIcon: Story = {
    args: {
        size: 'small',
        icon: cartIcon,
        onClick: () => alert('Added to cart!'),
    },
};

export const DisabledLarge: Story = {
    args: {
        size: 'large',
        children: 'Add to Cart',
        disabled: true,
    },
};

export const DisabledSmall: Story = {
    args: {
        size: 'small',
        icon: cartIcon,
        disabled: true,
    },
};
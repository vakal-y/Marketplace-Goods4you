import { Meta, StoryFn } from '@storybook/react';
import Accordion from './Accordion';
import { AccordionProps } from '../interfaces/types';

const meta: Meta<typeof Accordion> = {
    title: 'ui/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    args: {
        faqs: [
            {
                id: 1,
                question: 'How can I track the status of my order?',
                answer: 'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.'
            },
            {
                id: 2,
                question: 'What payment methods do you accept?',
                answer: 'We accept various payment methods including credit cards, PayPal, and other online payment services. You can choose the most convenient method during the checkout process.'
            },
            {
                id: 3,
                question: 'How can I return or exchange an item?',
                answer: 'If you are not satisfied with your purchase, you can return or exchange the item within 30 days of receipt. Please visit our Returns & Exchanges page for detailed instructions.'
            }
        ]
    },
};

export default meta;

const Template: StoryFn<AccordionProps> = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Accordion';

export const DarkBackground = Template.bind({});
DarkBackground.parameters = {
    backgrounds: { default: 'dark' },
};
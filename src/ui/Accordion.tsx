import styles from './Accordion.module.scss';
import { useState } from 'react';
import { AccordionProps } from '../interfaces/types';

const Accordion: React.FC<AccordionProps> = () => {
    const [faqOpen, setFaqOpen] = useState<number[]>([]);

    const faqs = [
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
    ];

    const toggleFaq = (index: number) => {
        setFaqOpen(prevOpen =>
            prevOpen.includes(index)
                ? prevOpen.filter(i => i !== index)
                : [...prevOpen, index]
        );
    };

    return (
        <div className={styles.accordion}>
            {faqs.map(({ id, question, answer }) => (
                <div key={id} className={styles.faqItem}>
                    <div
                        className={`${styles.faqHeader} ${faqOpen.includes(id) ? styles.open : ''}`}
                        onClick={() => toggleFaq(id)}
                        aria-expanded={faqOpen.includes(id)}
                        aria-controls={`faq-answer-${id}`}
                        id={`faq-question-${id}`}
                    >
                        <h3>{question}</h3>
                        <span className={`${styles.icon} ${faqOpen.includes(id) ? styles.open : ''}`}></span>
                    </div>
                    <div
                        className={`${styles.faqContentInner} ${faqOpen.includes(id) ? styles.open : ''}`}
                        id={`faq-answer-${id}`}
                        aria-labelledby={`faq-question-${id}`}
                    >
                        <p>{answer}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Accordion;
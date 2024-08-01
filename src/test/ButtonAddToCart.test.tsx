import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ButtonAddToCart from '../ui/ButtonAddToCart';

describe('ButtonAddToCart', () => {
    it('рендерится корректно', () => {
        render(<ButtonAddToCart size="small" onClick={() => { }} ariaLabel="Add item" />)
        expect(screen.getByLabelText('Add item')).toBeInTheDocument()
    });

    it('вызывает onClick при клике', () => {
        const handleClick = vi.fn();
        render(<ButtonAddToCart size="small" onClick={handleClick} ariaLabel="Add item" />);
        fireEvent.click(screen.getByLabelText('Add item'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('отключена, когда установлен пропс disabled', () => {
        render(<ButtonAddToCart size="small" onClick={() => { }} ariaLabel="Add item" disabled />);
        expect(screen.getByLabelText('Add item')).toBeDisabled();
    });
});
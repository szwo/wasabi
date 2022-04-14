import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';
import QuantityPicker, { QuantityPickerProps } from './quantityPicker.component';

describe('Quantity Picker', () => {
    const mockSetQuantity = jest.fn();

    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup({
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });
    });

    describe('Decrement', () => {
        it('should disable the decrement button if quantity is 0', () => {
            const props: QuantityPickerProps = {
                max: 0,
                quantity: 0,
                setQuantity: mockSetQuantity,
            };
            render(<QuantityPicker {...props} />);
            const button = screen.getByTestId('quantity-picker--decrement');
            expect(button).toBeDisabled();
        });

        it('should call set quantity when decrement button is clicked', async () => {
            const mockQuantity = 1;
            const props: QuantityPickerProps = {
                max: 0,
                quantity: mockQuantity,
                setQuantity: mockSetQuantity,
            };
            render(<QuantityPicker {...props} />);
            const button = screen.getByTestId('quantity-picker--decrement');
            const inputField = screen.getByTestId('quantity-picker--input');

            expect(inputField).toHaveValue(mockQuantity);
            await act(() => user.click(button));

            expect(mockSetQuantity).toHaveBeenCalled(); // TODO: How can we test this better?
        });
    });

    describe('Increment', () => {
        it('should disable the increment button if quantity is equal to max', () => {
            const props: QuantityPickerProps = {
                max: 5,
                quantity: 5,
                setQuantity: mockSetQuantity,
            };
            render(<QuantityPicker {...props} />);
            const button = screen.getByTestId('quantity-picker--increment');
            expect(button).toBeDisabled();
        });

        it('should call set quantity when increment button is clicked', async () => {
            const mockQuantity = 0;
            const props: QuantityPickerProps = {
                max: 5,
                quantity: mockQuantity,
                setQuantity: mockSetQuantity,
            };
            render(<QuantityPicker {...props} />);
            const button = screen.getByTestId('quantity-picker--increment');
            const inputField = screen.getByTestId('quantity-picker--input');

            expect(inputField).toHaveValue(mockQuantity);
            await act(() => user.click(button));

            expect(mockSetQuantity).toHaveBeenCalled(); // TODO: How can we test this better?
        });
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Item, { ItemProps } from './item.component';
import { useRound } from 'hooks';

jest.mock('hooks');

describe('Item', () => {
    const expectedItemName = 'mockItem';
    const expectedItemDescription = 'mockItemDescription';
    const expectedItemScore = 7;
    const mockSetScore = jest.fn();
    const mockProps: ItemProps = {
        calculation: jest.fn().mockImplementation(quantity => quantity),
        description: expectedItemDescription,
        max: 1,
        name: expectedItemName,
        score: expectedItemScore,
        setScore: mockSetScore,
        wasabiEligible: false,
    };

    beforeEach(() => {
        (useRound as jest.Mock).mockReturnValue({
            currentRound: 0,
        });
    });

    it('should display item name and score', () => {
        render(<Item {...mockProps} />);

        expect(screen.getByText(expectedItemName)).toBeInTheDocument();
        expect(screen.getByText(expectedItemDescription)).toBeInTheDocument();
        expect(screen.getByText(`Total: ${expectedItemScore}`)).toBeInTheDocument();
    });

    it('should only render standard picker if item is not wasabi eligible', () => {
        render(<Item {...mockProps} />);

        expect(screen.getByTestId('item--picker-container')).toBeInTheDocument();
        expect(screen.queryByTestId('item--wasabi-container')).not.toBeInTheDocument();
        expect(screen.queryByText('x3 with Wasabi')).not.toBeInTheDocument();
    });

    it('should render both standard and wasabi picker if item is wasabi eligible', () => {
        const wasabiEligibleItemProps: ItemProps = {
            calculation: jest.fn().mockImplementation(quantity => quantity),
            description: '',
            max: 1,
            name: expectedItemName,
            score: expectedItemScore,
            setScore: mockSetScore,
            wasabiEligible: true,
        };

        render(<Item {...wasabiEligibleItemProps} />);

        expect(screen.getByTestId('item--picker-container')).toBeInTheDocument();
        expect(screen.getByTestId('item--wasabi-container')).toBeInTheDocument();
        expect(screen.getByText('x3 with Wasabi')).toBeInTheDocument();
    });
});

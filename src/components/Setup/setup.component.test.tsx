import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';
import { RoundProvider } from 'providers';
import React from 'react';
import Setup, { SetupProps } from './setup.component';
import { useScores, useToast } from 'hooks';

jest.mock('hooks');

describe('Setup', () => {
    const mockProps: SetupProps = {
        showGame: jest.fn(),
    };
    const mockCreatePlayer = jest.fn();

    let user: UserEvent;

    beforeEach(() => {
        (useScores as jest.Mock).mockReturnValue({
            getPlayers: jest.fn().mockReturnValue({}),
            createPlayer: mockCreatePlayer,
        });
        (useToast as jest.Mock).mockReturnValue({
            displayToast: jest.fn(),
        });
        user = userEvent.setup();
        render(
            <RoundProvider>
                <Setup {...mockProps} />
            </RoundProvider>
        );
    });

    describe('Creating a player', () => {
        it('should allow the user to type a player name', async () => {
            const expectedInput = 'hello';
            const inputElement = screen.getByRole('textbox');
            expect(inputElement).toBeInTheDocument();
            expect(inputElement).toHaveValue('');
            await act(() => user.type(inputElement, expectedInput));
            expect(inputElement).toHaveValue(expectedInput);
        });

        describe('Invalid input', () => {
            const invalidPlayerName = 'hello$'; // Special characters are not allowed

            it('should not allow an invalid player name to be created', async () => {
                const inputElement = screen.getByRole('textbox');
                const submitElement = screen.getByTestId('setup--create-btn');

                await act(() => user.type(inputElement, invalidPlayerName));

                expect(inputElement).toHaveValue(invalidPlayerName);
                expect(submitElement).toBeDisabled();
            });
        });

        describe('Valid input', () => {
            const validPlayerName = 'hello';

            it('should allow the player to create a valid player name', async () => {
                const inputElement = screen.getByRole('textbox');
                const submitElement = screen.getByTestId('setup--create-btn');

                await act(() => user.type(inputElement, validPlayerName));

                expect(inputElement).toHaveValue(validPlayerName);
                expect(submitElement).not.toBeDisabled();

                await act(() => user.click(submitElement));

                expect(mockCreatePlayer).toHaveBeenCalledWith(validPlayerName);
            });
        });
    });
});

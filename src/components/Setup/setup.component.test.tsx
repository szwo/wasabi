import { act, render, screen } from '@testing-library/react';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';
import React from 'react';
import Setup, { SetupProps } from './setup.component';
import { useScores, useToast } from 'hooks';

jest.mock('hooks');

describe('Setup', () => {
    const mockProps: SetupProps = {
        startGame: jest.fn(),
    };
    const mockCreatePlayer = jest.fn();
    const mockDisplayToast = jest.fn();
    const addPlayerHelper = async (playerName: string) => {
        const inputElement = screen.getByRole('textbox');
        const submitElement = screen.getByTestId('setup--create-btn');

        await act(() => user.type(inputElement, playerName));
        await act(() => user.click(submitElement));
    };

    let user: UserEvent;

    beforeEach(() => {
        (useScores as jest.Mock).mockReturnValue({
            createPlayer: mockCreatePlayer,
        });
        (useToast as jest.Mock).mockReturnValue({
            displayToast: mockDisplayToast,
        });

        user = userEvent.setup({
            pointerEventsCheck: PointerEventsCheckLevel.EachTarget,
        });
        render(<Setup {...mockProps} />);
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

            it('should allow the player to create a valid player name via button click', async () => {
                const inputElement = screen.getByRole('textbox');
                const submitElement = screen.getByTestId('setup--create-btn');

                await act(() => user.type(inputElement, validPlayerName));

                expect(inputElement).toHaveValue(validPlayerName);
                expect(submitElement).not.toBeDisabled();

                await act(() => user.click(submitElement));
                expect(mockDisplayToast).toHaveBeenCalledWith('success', `Welcome, ${validPlayerName}!`);
                expect(screen.getByTestId(`setup--player-${validPlayerName}`)).toBeInTheDocument();
            });

            it('should allow the player to create a valid player name and submit via Enter key', async () => {
                const inputElement = screen.getByRole('textbox');
                const submitElement = screen.getByTestId('setup--create-btn');

                await act(() => user.type(inputElement, validPlayerName));

                expect(inputElement).toHaveValue(validPlayerName);
                expect(submitElement).not.toBeDisabled();

                await act(() => user.keyboard('[Enter]'));
                expect(mockDisplayToast).toHaveBeenCalledWith('success', `Welcome, ${validPlayerName}!`);
                expect(screen.getByTestId(`setup--player-${validPlayerName}`)).toBeInTheDocument();
            });
        });

        describe('Taken name', () => {
            it('should now allow the player to create with a name that has already been taken', async () => {
                await addPlayerHelper('player1');
                await addPlayerHelper('player1');
                expect(mockDisplayToast).toHaveBeenCalledWith('error', `Name already taken!`);
                expect(screen.getAllByTestId(`setup--player-player1`)).toHaveLength(1);
            });
        });
    });

    describe('Starting the game', () => {
        const getButtonTextHelper = (playerCount: number) => `Need at least ${2 - playerCount} more players to play`;

        it('should not allow the game to be started if minimum players are not met', async () => {
            const startElement = screen.getByTestId('setup--start-game-btn');

            expect(startElement).toBeDisabled();
            expect(screen.getByText(getButtonTextHelper(0))).toBeInTheDocument();

            await addPlayerHelper('player1');
            expect(startElement).toBeDisabled();
            expect(screen.getByText(getButtonTextHelper(1))).toBeInTheDocument();
        });

        it('should allow the game to be started if minimum players are met', async () => {
            const startElement = screen.getByTestId('setup--start-game-btn');

            expect(startElement).toBeDisabled();
            expect(screen.getByText(getButtonTextHelper(0))).toBeInTheDocument();

            await addPlayerHelper('player1');
            expect(startElement).toBeDisabled();
            expect(screen.getByText(getButtonTextHelper(1))).toBeInTheDocument();

            await addPlayerHelper('player2');
            expect(startElement).not.toBeDisabled();
            expect(screen.queryByText(getButtonTextHelper(2))).not.toBeInTheDocument();
            expect(screen.getByText('Start Game!')).toBeInTheDocument();
        });

        it('should create players when Start Game button is pressed', async () => {
            const playersToAdd = ['player1', 'player2'];

            for (const player of playersToAdd) {
                await addPlayerHelper(player);
            }

            await act(() => user.click(screen.getByText('Start Game!')));
            expect(mockCreatePlayer).toHaveBeenCalledTimes(playersToAdd.length);
            expect(mockCreatePlayer).toHaveBeenNthCalledWith(1, playersToAdd[0]);
            expect(mockCreatePlayer).toHaveBeenNthCalledWith(2, playersToAdd[1]);
        });
    });
});

import React, { FC, KeyboardEventHandler, useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { useScores, useToast } from 'hooks';

import './setup.styles.scss';
export interface SetupProps {
    startGame: () => void;
}

const Setup: FC<SetupProps> = (props: SetupProps) => {
    const { startGame } = props;
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState<Array<string>>([]);
    const { createPlayer } = useScores();
    const { displayToast } = useToast();

    const minimumPlayersMet = players.length > 1;
    const alphanumericRegex = new RegExp(/^[A-Za-z0-9]+$/);
    const isValidInput = alphanumericRegex.test(playerName);

    const handleCreatePlayer = () => {
        if (players.includes(playerName)) {
            displayToast('error', 'Name already taken!');
        } else {
            setPlayers(current => [...current, playerName]);
            displayToast('success', `Welcome, ${playerName}!`);
            setPlayerName('');
        }
    };

    const handleEnterKeydown: KeyboardEventHandler = e => {
        if (e.code === 'Enter') {
            handleCreatePlayer();
        }
    };

    const handleStartGame = () => {
        for (const player of players) {
            createPlayer(player);
        }

        startGame();
    };

    return (
        <div className="setup--container">
            <Paper elevation={3}>
                <div className="setup--form-container">
                    <h1>Wasabi</h1>
                    <h2>Add players to the game!</h2>
                    <div className="setup--input-container">
                        <TextField
                            className="setup--input-field"
                            required
                            label="Player Name"
                            variant="outlined"
                            value={playerName}
                            error={playerName.length > 0 && !isValidInput}
                            onChange={e => setPlayerName(e.target.value)}
                            onKeyDown={e => handleEnterKeydown(e)}
                        />
                        <Button
                            className="setup--input-btn"
                            data-testid="setup--create-btn"
                            variant="contained"
                            onClick={handleCreatePlayer}
                            disabled={playerName.length === 0 || !isValidInput}
                        >
                            Create Player
                        </Button>
                    </div>
                    <div className="setup--submit-container">
                        <Button
                            data-testid="setup--start-game-btn"
                            variant="contained"
                            color="success"
                            onClick={handleStartGame}
                            disabled={!minimumPlayersMet}
                        >
                            {minimumPlayersMet
                                ? 'Start Game!'
                                : `Need at least ${2 - players.length} more players to play`}
                        </Button>
                    </div>
                    <div className="setup--players-list">
                        <h2>Players in this game:</h2>
                        <ol>
                            {players.map(playerId => (
                                <li key={playerId} data-testid={`setup--player-${playerId}`}>
                                    {playerId}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Setup;

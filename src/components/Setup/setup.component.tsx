import React, { FC, KeyboardEventHandler, useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { useScores, useToast } from 'hooks';

import './setup.styles.scss';
interface SetupProps {
    showGame: () => void;
}

const Setup: FC<SetupProps> = (props: SetupProps) => {
    const { showGame } = props;
    const [playerName, setPlayerName] = useState('');
    const { getPlayers, createPlayer } = useScores();
    const { displayToast } = useToast();
    const players = getPlayers();
    const playerIds = Object.keys(players);
    const minimumPlayersMet = playerIds.length < 2;
    const alphanumericRegex = new RegExp(/^[A-Za-z0-9]+$/);
    const isValidInput = alphanumericRegex.test(playerName);

    const handleCreatePlayer = () => {
        if (Object.prototype.hasOwnProperty.call(players, playerName)) {
            displayToast('error', 'Name already taken!');
        } else {
            createPlayer(playerName);
            displayToast('success', 'New player added!');
            setPlayerName('');
        }
    };

    const handleEnterKeydown: KeyboardEventHandler = e => {
        if (e.code === 'Enter') {
            handleCreatePlayer();
        }
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
                            variant="contained"
                            onClick={handleCreatePlayer}
                            disabled={playerName.length === 0 || !isValidInput}
                        >
                            Create Player
                        </Button>
                    </div>
                    <div className="setup--submit-container">
                        <Button variant="contained" color="success" onClick={showGame} disabled={minimumPlayersMet}>
                            {minimumPlayersMet
                                ? `Need at least ${2 - playerIds.length} more players to play`
                                : 'Start Game!'}
                        </Button>
                    </div>
                    <div className="setup--players-list">
                        <h2>Players in this game:</h2>
                        <ol>
                            {playerIds.map(playerId => (
                                <li key={playerId}>{playerId}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Setup;

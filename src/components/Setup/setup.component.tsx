import React, { FC, useState } from 'react';
import { useScores } from 'hooks';

import './setup.styles.scss';
import { Alert, Button, Paper, Snackbar, TextField } from '@mui/material';
interface SetupProps {
    showGame: () => void;
}

const Setup: FC<SetupProps> = (props: SetupProps) => {
    const { showGame } = props;
    const [playerName, setPlayerName] = useState('');
    // TODO: Move Toasts to it's own component
    // TODO: Adopt recommended pattern for multiple toasts: https://mui.com/components/snackbars/#consecutive-snackbars
    const [showFailureToast, setShowFailureToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const { getPlayers, createPlayer } = useScores();
    const players = getPlayers();
    const playerIds = Object.keys(players);
    const minimumPlayersMet = playerIds.length < 2;
    const alphanumericRegex = new RegExp(/^[A-Za-z0-9]+$/);
    const isValidInput = alphanumericRegex.test(playerName);

    const handleCreatePlayer = () => {
        if (Object.prototype.hasOwnProperty.call(players, playerName)) {
            handleShowFailureToast();
        } else {
            createPlayer(playerName);
            handleShowSuccessToast();
            setPlayerName('');
        }
    };

    const handleShowSuccessToast = () => {
        setShowFailureToast(false);
        setShowSuccessToast(false);
        setShowSuccessToast(true);
    };

    const handleShowFailureToast = () => {
        setShowFailureToast(false);
        setShowSuccessToast(false);
        setShowFailureToast(true);
    };

    const handleSuccessToastClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSuccessToast(false);
    };

    const handleFailureToastClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowFailureToast(false);
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
                    <div className="setup--players-list">
                        <h2>Players in this game:</h2>
                        <ol>
                            {playerIds.map(playerId => (
                                <li>{playerId}</li>
                            ))}
                        </ol>
                    </div>
                    <div className="setup--submit-container">
                        <Button variant="contained" color="success" onClick={showGame} disabled={minimumPlayersMet}>
                            {minimumPlayersMet
                                ? `Need at least ${2 - playerIds.length} more players to play`
                                : 'Start Game!'}
                        </Button>
                    </div>
                </div>
            </Paper>
            <Snackbar open={showSuccessToast} onClose={handleSuccessToastClose} autoHideDuration={6000}>
                <Alert severity="success">New player added!</Alert>
            </Snackbar>
            <Snackbar open={showFailureToast} onClose={handleFailureToastClose} autoHideDuration={6000}>
                <Alert severity="error">Player name already taken! Try something else.</Alert>
            </Snackbar>
        </div>
    );
};

export default Setup;

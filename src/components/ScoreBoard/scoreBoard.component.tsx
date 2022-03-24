import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ScoreBoardProps {
    open: boolean;
    handleClose: () => void;
    round: number;
    players: Record<string, Player>;
}

const ScoreBoard = (props: ScoreBoardProps) => {
    const { open, handleClose, round, players } = props;

    const createPlayerScores = (): ReactNode => {
        return (
            <>
                {Object.keys(players).map(player => {
                    const playerScore = players[player].rounds[round];
                    return (
                        <DialogContentText key={player}>
                            {player}: {playerScore?.totalScore}
                        </DialogContentText>
                    );
                })}
            </>
        );
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Round {round + 1} Complete!</DialogTitle>
                <DialogContent>{createPlayerScores()}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ScoreBoard;

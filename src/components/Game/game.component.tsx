import { Grid } from '@mui/material';
import ScoreCard from 'components/ScoreCard';
import React, { FC, useEffect, useState } from 'react';
import './game.styles.scss';

const players = ['Sim', 'Audge']; // TODO: Should be dynamic

const Game: FC = () => {
    const [scores, setScores] = useState({});

    useEffect(() => {
        console.log(scores);
    }, [scores]);

    const colSize = 12 / players.length;

    const updateScore = (id: string, newScore: number) => {
        setScores(previous => {
            return {
                ...previous,
                [id]: newScore,
            };
        });
    };

    return (
        <div className="game-container">
            <Grid container>
                {players.map(player => (
                    <Grid item key={player} xs={colSize}>
                        <ScoreCard id={player} updateScore={updateScore} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Game;

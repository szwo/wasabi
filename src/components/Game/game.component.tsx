import { Button, Grid } from '@mui/material';
import ScoreBoard from 'components/ScoreBoard';
import ScoreCard from 'components/ScoreCard';
import { useScoresContext } from 'hooks';
import { AddMakiScoreAction, CreatePlayerAction, SetScoreAction } from 'providers/scores.actions';
import React, { FC, useEffect, useState } from 'react';
import './game.styles.scss';

const players = ['Mochi', 'Oreo']; // TODO: Should be dynamic
const colSize = 12 / players.length;

const Game: FC = () => {
    const [state, dispatch] = useScoresContext();
    const [round, setRound] = useState(0); // TODO: Advance me
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
        // TODO: Remove me when dynamic player creation is done
        for (const player of players) {
            const action: CreatePlayerAction = {
                type: 'CREATE_PLAYER',
                payload: {
                    playerId: player,
                },
            };
            dispatch(action);
        }
    }, []);

    /**
     * Helper function for distributing points from Maki winners
     * @param {number} totalPoints Total points to be distributed (6 for first, 3 for second)
     * @param {Array<string>} winners List of player ids in each Maki group
     */
    const addMakiPoints = (totalPoints: number, winners: string[]): void => {
        const points = Math.floor(totalPoints / winners.length);

        for (const winnerId of winners) {
            const action: AddMakiScoreAction = {
                type: 'ADD_MAKI_SCORE',
                payload: {
                    playerId: winnerId,
                    round,
                    pointsToAdd: points,
                },
            };

            dispatch(action);
        }
    };

    /**
     * Helper function for generating Maki frequency map to player IDs
     * @returns {Record<string, Array<string>>} Frequency map showing maki counts and corresponding player ids
     */
    const collectMakiCounts = (): Record<string, Array<string>> => {
        const result: Record<string, Array<string>> = {};

        for (const [playerId, scores] of Object.entries(state)) {
            const currentRound = scores.rounds[round];
            const roundMakiCount = currentRound.makiQty;
            if (roundMakiCount > 0) {
                if (result[roundMakiCount]) {
                    result[roundMakiCount].push(playerId);
                } else {
                    result[roundMakiCount] = [playerId];
                }
            }
        }

        return result;
    };

    /**
     * Determine who has the most/second most maki count
     * First place gets 6 points added to their score
     * Second place gets 3 points added to their score
     * In a tie, the points are split between those in the tie
     * For odd numbered ties, the points are split rounding down
     */
    const calculateMakiWinners = () => {
        const distribution = collectMakiCounts();
        const orderedKeys = Object.keys(distribution).sort((a, b) => parseInt(b) - parseInt(a));

        const firstPlace = orderedKeys[0];
        const firstPlaceWinners = distribution[firstPlace] || [];
        if (firstPlaceWinners.length) {
            console.log(firstPlaceWinners);
            addMakiPoints(6, firstPlaceWinners);
        }

        if (orderedKeys.length > 1) {
            const secondPlace = orderedKeys[1];
            const secondPlaceWinners = distribution[secondPlace] || [];
            addMakiPoints(3, secondPlaceWinners);
        }
    };

    const finishRound = () => {
        calculateMakiWinners();
        setShowScores(true);
        // if (round < 3) {
        //     setRound(round + 1);
        // }
    };

    const dispatchUpdateScore = (playerId: string, rawScore: number, makiQty: number, puddingQty: number): void => {
        const action: SetScoreAction = {
            type: 'SET_SCORE',
            payload: {
                playerId,
                round,
                rawScore,
                makiQty,
                puddingQty,
            },
        };
        dispatch(action);
    };

    return (
        <div className="game-container">
            <h1 className="round-heading">Round {round + 1}</h1>
            <Button onClick={finishRound}>Test Maki Calc</Button>
            <ScoreBoard open={showScores} handleClose={() => setShowScores(false)} round={round} scores={state} />
            <Grid container>
                {players.map(player => (
                    <Grid item key={player} xs={colSize}>
                        <ScoreCard id={player} sendScore={dispatchUpdateScore} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Game;

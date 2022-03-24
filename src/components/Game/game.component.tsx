import { Button, Grid } from '@mui/material';
import ScoreBoard from 'components/ScoreBoard';
import ScoreCard from 'components/ScoreCard';
import GameOver from 'components/GameOver';
import { useScoresContext } from 'hooks';
import {
    AddMakiScoreAction,
    AdvanceRoundAction,
    SetScoreAction,
    TotalRoundScoreAction,
} from 'providers/scores.actions';
import React, { FC, useState } from 'react';
import './game.styles.scss';

const Game: FC = () => {
    const [state, dispatch] = useScoresContext();
    const { currentRound } = state;
    const players = Object.keys(state.players);
    const [showScores, setShowScores] = useState(false);

    const colSize = 12 / Object.keys(state.players).length;

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
                    round: currentRound,
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

        for (const [playerId, scores] of Object.entries(state.players)) {
            const currentRoundScores = scores.rounds[currentRound];
            const roundMakiCount = currentRoundScores.makiQty;
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
            addMakiPoints(6, firstPlaceWinners);
        }

        if (orderedKeys.length > 1) {
            const secondPlace = orderedKeys[1];
            const secondPlaceWinners = distribution[secondPlace] || [];
            addMakiPoints(3, secondPlaceWinners);
        }
    };

    const calculateRoundScores = () => {
        calculateMakiWinners();
        const action: TotalRoundScoreAction = {
            type: 'TOTAL_ROUND_SCORES',
        };
        dispatch(action);
        setShowScores(true);
    };

    const dispatchUpdateScore = (playerId: string, rawScore: number, makiQty: number, puddingQty: number): void => {
        const action: SetScoreAction = {
            type: 'SET_SCORE',
            payload: {
                playerId,
                round: currentRound,
                rawScore,
                makiQty,
                puddingQty,
            },
        };
        dispatch(action);
    };

    const closeScoreBoard = () => {
        setShowScores(false);
        const action: AdvanceRoundAction = {
            type: 'ADVANCE_ROUND',
        };
        dispatch(action);
    };

    if (currentRound > 2) {
        return <GameOver />;
    }

    return (
        <div className="game-container">
            <h1 className="round-heading">Round {currentRound + 1}</h1>
            <Button onClick={calculateRoundScores}>Finish Round</Button>
            <ScoreBoard open={showScores} handleClose={closeScoreBoard} round={currentRound} scores={state} />
            <Grid container>
                {players.map((playerId: string) => (
                    <Grid item key={playerId} xs={colSize}>
                        <ScoreCard id={playerId} sendScore={dispatchUpdateScore} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Game;

import { Button, Grid } from '@mui/material';
import ScoreBoard from 'components/ScoreBoard';
import ScoreCard from 'components/ScoreCard';
import GameOver from 'components/GameOver';
import { useRound, useScores } from 'hooks';
import React, { FC, useState } from 'react';
import './game.styles.scss';

const Game: FC = () => {
    const { getPlayers, addMakiPoints, setIndividualScore, totalRoundScores } = useScores();
    const { currentRound, advanceRound } = useRound();
    const players = getPlayers();
    const playerIds = Object.keys(players);
    const [showScores, setShowScores] = useState(false);

    const colSize = 12 / playerIds.length;

    /**
     * Helper function for generating Maki frequency map to player IDs
     * @returns {Record<string, Array<string>>} Frequency map showing maki counts and corresponding player ids
     */
    const collectMakiCounts = (): Record<string, Array<string>> => {
        const result: Record<string, Array<string>> = {};

        for (const [playerId, scores] of Object.entries(players)) {
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
        totalRoundScores();
        setShowScores(true);
    };

    const closeScoreBoard = () => {
        setShowScores(false);
        advanceRound();
    };

    if (currentRound > 2) {
        return <GameOver />;
    }

    return (
        <div className="game-container">
            <h1 className="round-heading">Round {currentRound + 1}</h1>
            <Button onClick={calculateRoundScores}>Finish Round</Button>
            <ScoreBoard open={showScores} handleClose={closeScoreBoard} round={currentRound} players={players} />
            <Grid container>
                {playerIds.map((playerId: string) => (
                    <Grid item key={playerId} xs={colSize}>
                        <ScoreCard id={playerId} sendScore={setIndividualScore} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Game;

import { Button, Grid } from '@mui/material';
import ScoreCard from 'components/ScoreCard';
import { ScoreType } from 'helpers/enums';
import React, { FC, useEffect, useState } from 'react';
import './game.styles.scss';

const players = ['Sim', 'Audge', 'Oreo']; // TODO: Should be dynamic

const Game: FC = () => {
    const [scores, setScores] = useState<Record<string, PlayerScore>>({});

    useEffect(() => {
        console.log(scores);
    }, [scores]);

    const colSize = 12 / players.length;

    /**
     * Helper function for converting scores array to frequency map for Maki counts
     * @returns {Record<string, Array<string>>} Frequency map showing maki counts and corresponding player ids
     */
    const collectMakiCounts = (): Record<string, Array<string>> => {
        const result: Record<string, Array<string>> = {};

        for (const [player, score] of Object.entries(scores)) {
            if (score.maki > 0) {
                const makiCount = score.maki.toString();

                if (result[makiCount]) {
                    result[makiCount].push(player);
                } else {
                    result[makiCount] = [player];
                }
            }
        }

        return result;
    };

    /**
     * Helper function for distributing points from Maki winners
     * @param {number} totalPoints Total points to be distributed (6 for first, 3 for second)
     * @param {Array<string>} winners List of player ids in each Maki group
     */
    const addMakiPoints = (totalPoints: number, winners: string[]): void => {
        const points = Math.floor(totalPoints / winners.length);

        for (const winner of winners) {
            setScores(prev => {
                return {
                    ...prev,
                    [winner]: {
                        ...prev[winner],
                        score: prev[winner].score + points,
                    },
                };
            });
        }
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
        if (firstPlaceWinners.length) addMakiPoints(6, firstPlaceWinners);

        if (orderedKeys.length > 1) {
            const secondPlace = orderedKeys[1];
            const secondPlaceWinners = distribution[secondPlace] || [];
            addMakiPoints(3, secondPlaceWinners);
        }
    };

    const updateScore = (type: ScoreType, id: string, newScore: number) => {
        setScores(previous => {
            return {
                ...previous,
                [id]: {
                    ...previous[id],
                    [type]: newScore,
                },
            };
        });
    };

    return (
        <div className="game-container">
            <Grid container>
                {players.map(player => (
                    <Grid item key={player} xs={colSize}>
                        <Button onClick={() => calculateMakiWinners()}>Test Maki Calc</Button>
                        <ScoreCard id={player} updateScore={updateScore} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Game;

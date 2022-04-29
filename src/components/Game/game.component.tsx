import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import ScoreBoard from 'components/ScoreBoard';
import ScoreCard from 'components/ScoreCard';
import GameOver from 'components/GameOver';
import { calculateMakiWinners } from 'helpers/maki.helper';
import { useRound, useScores } from 'hooks';
import { IndividualRoundScore } from 'hooks/useScores';
import React, { FC, useState } from 'react';
import './game.styles.scss';

const Game: FC = () => {
    const { getPlayers, setPlayerRoundScore } = useScores();
    const { currentRound, advanceRound } = useRound();
    const players = getPlayers();
    const playerIds = Object.keys(players);
    const [showScores, setShowScores] = useState(false);
    const [recordedScores, setRecordedScores] = useState<Record<string, IndividualRoundScore>>({});

    /**
     * Queue up individual round score to be submitted when round completes
     * @param {RoundScore} score object for individual player per round
     */
    const recordIndividualScore = (playerId: string, score: IndividualRoundScore) => {
        setRecordedScores(current => ({
            ...current,
            [playerId]: score,
        }));
    };

    /**
     * Iterate through recorded scores and dispatch an action for each player
     * to set their finalized round score to context
     * @param {Record<string,number>} makiWinners distribution of Maki winners to points to be awarded
     */
    const totalAndSetRoundScores = (makiWinners: Record<string, number>) => {
        for (const [playerId, score] of Object.entries(recordedScores)) {
            const { rawScore, makiQty, puddingQty } = score;
            const makiScore = makiWinners[playerId] ?? score.makiScore;
            const finalizedRoundScore: RoundScore = {
                rawScore,
                makiQty,
                makiScore,
                totalScore: rawScore + makiScore,
            };

            setPlayerRoundScore(playerId, finalizedRoundScore, puddingQty);
        }
    };

    /**
     * Submits all recorded scores to state, perform final calculations, then shows scoreboard
     */
    const calculateRoundScores = () => {
        const makiWinners = calculateMakiWinners(recordedScores);
        totalAndSetRoundScores(makiWinners);
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
        <>
            <AppBar className="game--round-heading" position="static">
                <Toolbar>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Round {currentRound + 1}
                    </Typography>
                    <Button
                        color="inherit"
                        variant="outlined"
                        onClick={calculateRoundScores}
                        disabled={Object.keys(recordedScores).length < playerIds.length}
                    >
                        Finish Round
                    </Button>
                </Toolbar>
            </AppBar>
            <ScoreBoard open={showScores} handleClose={closeScoreBoard} round={currentRound} players={players} />
            <div className="game--scorecard-container">
                {playerIds.map((playerId: string) => (
                    <div key={playerId} className="game--scorecard-item">
                        <ScoreCard playerId={playerId} sendScores={recordIndividualScore} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Game;

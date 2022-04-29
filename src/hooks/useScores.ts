import { useContext } from 'react';
import { ScoresContext } from 'providers/Scores/scores.provider';
import { CreatePlayerAction, SetPlayerRoundScoreAction } from 'providers/Scores/scores.actions';
import useRound from './useRound';

export interface IndividualRoundScore {
    rawScore: number;
    makiQty: number;
    makiScore: number;
    puddingQty: number;
}
interface useScoresType {
    scores: ScoresState;
    getPlayers: () => Record<string, Player>;
    createPlayer: (playerName: string) => void;
    setPlayerRoundScore: (playerId: string, scores: RoundScore, puddingQty: number) => void;
}

const useScores = (): useScoresType => {
    const context = useContext(ScoresContext);
    if (!context) {
        throw new Error('useScores must be used within a ScoresProvider');
    }

    const [scores, dispatch] = context;
    const { currentRound } = useRound();

    // Selectors
    const getPlayers = () => scores.players;

    // Dispatch actions

    /**
     * Dispatches an action to add a new player to ScoresContext
     * @param {string} playerName unique id used to identify player
     */
    const createPlayer = (playerName: string): void => {
        const action: CreatePlayerAction = {
            type: 'CREATE_PLAYER',
            payload: {
                playerId: playerName,
            },
        };
        dispatch(action);
    };

    /**
     * Dispatches an action to update a player's completed round score
     * @param roundScore
     */
    const setPlayerRoundScore = (playerId: string, scores: RoundScore, puddingQty: number) => {
        const action: SetPlayerRoundScoreAction = {
            type: 'SET_PLAYER_ROUND_SCORE',
            payload: {
                round: currentRound,
                playerId,
                scores,
                puddingQty,
            },
        };
        dispatch(action);
    };

    return {
        scores,
        getPlayers,
        createPlayer,
        setPlayerRoundScore,
    };
};

export default useScores;

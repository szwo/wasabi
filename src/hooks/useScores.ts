import { useContext } from 'react';
import { ScoresContext } from 'providers/Scores/scores.provider';
import {
    AddMakiScoreAction,
    TotalRoundScoresAction,
    SetScoreAction,
    CreatePlayerAction,
} from 'providers/Scores/scores.actions';
import useRound from './useRound';
interface useScoresType {
    scores: ScoresState;
    getPlayers: () => Record<string, Player>;
    addMakiPoints: (totalPoints: number, winners: string[]) => void;
    createPlayer: (playerName: string) => void;
    setIndividualScore: (playerId: string, rawScore: number, makiQty: number, puddingQty: number) => void;
    totalRoundScores: () => void;
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
     * Dispatches an action to submit an individual player's round scores
     * @param {string} playerId Player to update
     * @param {number} rawScore Total of static score values
     * @param {number} makiQty Quantity of maki pieces collected during round
     * @param {number} puddingQty Quantity of pudding pieces collected during round
     */
    const setIndividualScore = (playerId: string, rawScore: number, makiQty: number, puddingQty: number): void => {
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

    /**
     * Dispatches an action to calculate finalized round scores for all players
     */
    const totalRoundScores = (): void => {
        const action: TotalRoundScoresAction = {
            type: 'TOTAL_ROUND_SCORES',
            payload: {
                round: currentRound,
            },
        };

        dispatch(action);
    };

    return {
        scores,
        getPlayers,
        addMakiPoints,
        createPlayer,
        setIndividualScore,
        totalRoundScores,
    };
};

export default useScores;

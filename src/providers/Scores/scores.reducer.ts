import {
    AddMakiScoreAction,
    AdvanceRoundAction,
    CreatePlayerAction,
    SetScoreAction,
    TotalRoundScoreAction,
} from './scores.actions';

export type Actions =
    | AddMakiScoreAction
    | AdvanceRoundAction
    | CreatePlayerAction
    | SetScoreAction
    | TotalRoundScoreAction;

const addMakiScore = (state: ScoresState, action: AddMakiScoreAction): ScoresState => {
    const { playerId, round, pointsToAdd } = action.payload;

    // Clone the player record to avoid modifying underlying array by ref
    const playerRecord = JSON.parse(JSON.stringify(state.players[playerId]));
    const roundsArrayClone = [...playerRecord.rounds];
    roundsArrayClone[round].makiScore = pointsToAdd;

    return {
        ...state,
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                rounds: roundsArrayClone,
            },
        },
    };
};

const advanceRound = (state: ScoresState): ScoresState => {
    return {
        ...state,
        currentRound: state.currentRound + 1,
    };
};

const createPlayer = (state: ScoresState, action: CreatePlayerAction): ScoresState => {
    const { playerId } = action.payload;
    return {
        ...state,
        players: {
            ...state.players,
            [playerId]: {
                rounds: [
                    { rawScore: 0, makiQty: 0, makiScore: 0, totalScore: 0 },
                    { rawScore: 0, makiQty: 0, makiScore: 0, totalScore: 0 },
                    { rawScore: 0, makiQty: 0, makiScore: 0, totalScore: 0 },
                ],
                puddingQty: 0,
            },
        },
    };
};

/**
 * Selects the desired player's rounds array, modifies the selected index, and sets the new state
 * @returns new Scores state
 */
const setPlayerScore = (state: ScoresState, action: SetScoreAction): ScoresState => {
    const { playerId, round, rawScore, makiQty, puddingQty } = action.payload;
    const roundsArrayClone = [...state.players[playerId].rounds];
    roundsArrayClone[round] = {
        ...roundsArrayClone[round],
        rawScore,
        makiQty,
    };

    return {
        ...state,
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                rounds: roundsArrayClone,
                puddingQty: state.players[playerId].puddingQty + puddingQty,
            },
        },
    };
};

/**
 * Iterates through the scores and adds raw + maki scoring to set totalScore per round
 */
const totalRoundScores = (state: ScoresState): ScoresState => {
    // Update all player scores with total score
    const newPlayersObject: Record<string, Player> = JSON.parse(JSON.stringify(state.players));

    for (const playerScoreObject of Object.values(newPlayersObject)) {
        const closingRoundScores = playerScoreObject.rounds[state.currentRound];
        const { rawScore, makiScore } = closingRoundScores;
        closingRoundScores.totalScore = rawScore + makiScore;
    }

    return {
        ...state,
        players: newPlayersObject,
    };
};

const reducer = (state: ScoresState, action: Actions): ScoresState => {
    console.log(action);
    switch (action.type) {
        case 'ADD_MAKI_SCORE':
            return addMakiScore(state, action);
        case 'CREATE_PLAYER':
            return createPlayer(state, action);
        case 'SET_SCORE':
            return setPlayerScore(state, action);
        case 'TOTAL_ROUND_SCORES':
            return totalRoundScores(state);
        case 'ADVANCE_ROUND':
            return advanceRound(state);
        default:
            return state;
    }
};

export default reducer;

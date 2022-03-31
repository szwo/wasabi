import { AddMakiScoreAction, CreatePlayerAction, SetScoreAction, TotalRoundScoreAction } from './scores.actions';

export type Actions = AddMakiScoreAction | CreatePlayerAction | SetScoreAction | TotalRoundScoreAction;

/**
 * Adds the round-relative maki scoring to an individual player's makiScore
 * @param {ScoresState} state Current state
 * @param {AddMakiScoreAction} action Dispatch action with payload
 * @returns {ScoresState} Updated state
 */
const addMakiScore = (state: ScoresState, action: AddMakiScoreAction): ScoresState => {
    const { playerId, round, pointsToAdd } = action.payload;

    const newRounds: RoundScore[] = state.players[playerId].rounds.map((entry, index) => {
        if (index === round) {
            entry.makiScore = pointsToAdd;
        }

        return entry;
    });

    return {
        ...state,
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                rounds: newRounds,
            },
        },
    };
};

/**
 * Creates a new player in context
 * @param {ScoresState} state Current state
 * @param {CreatePlayerAction} action Dispatch action with payload
 * @returns {ScoresState} Updated state
 */
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
 * Selects the desired player's rounds array, modifies the selected index
 * @param {ScoresState} state Current state
 * @param {SetScoresAction} action Dispatch action with payload
 * @returns {ScoresState} Updated state
 */
const setPlayerScore = (state: ScoresState, action: SetScoreAction): ScoresState => {
    const { playerId, round, rawScore, makiQty, puddingQty } = action.payload;

    const newRounds: RoundScore[] = state.players[playerId].rounds.map((entry, index) => {
        if (index === round) {
            entry.rawScore = rawScore;
            entry.makiQty = makiQty;
        }

        return entry;
    });

    return {
        ...state,
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                rounds: newRounds,
                puddingQty: state.players[playerId].puddingQty + puddingQty,
            },
        },
    };
};

/**
 * Calculates the total score for a given round and player
 * @param {ScoresState} state Current state
 * @param {TotalRoundScoresAction} action Dispatch action with payload
 * @returns {ScoresState} Updated state
 */
const totalRoundScore = (state: ScoresState, action: TotalRoundScoreAction): ScoresState => {
    const { playerId, round } = action.payload;

    const newRounds: RoundScore[] = state.players[playerId].rounds.map((entry, index) => {
        if (index === round) {
            entry.totalScore = entry.rawScore + entry.makiScore;
        }

        return entry;
    });

    return {
        ...state,
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                rounds: newRounds,
            },
        },
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
        case 'TOTAL_ROUND_SCORE':
            return totalRoundScore(state, action);
        default:
            return state;
    }
};

export default reducer;

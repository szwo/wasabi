import { CreatePlayerAction, SetPlayerRoundScoreAction } from './scores.actions';

export type Actions = CreatePlayerAction | SetPlayerRoundScoreAction;

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
 * @param {SetPlayerRoundScoreAction} action Dispatch action with payload
 * @returns {ScoresState} Updated state
 */
const setPlayerRoundScore = (state: ScoresState, action: SetPlayerRoundScoreAction): ScoresState => {
    const { round, playerId, scores, puddingQty } = action.payload;
    const { rawScore, makiQty, makiScore, totalScore } = scores;

    const newRounds: RoundScore[] = state.players[playerId].rounds.map((entry, index) => {
        if (index === round) {
            entry.rawScore = rawScore;
            entry.makiQty = makiQty;
            (entry.makiScore = makiScore), (entry.totalScore = totalScore);
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

const reducer = (state: ScoresState, action: Actions): ScoresState => {
    console.log(action);
    switch (action.type) {
        case 'CREATE_PLAYER':
            return createPlayer(state, action);
        case 'SET_PLAYER_ROUND_SCORE':
            return setPlayerRoundScore(state, action);
        default:
            return state;
    }
};

export default reducer;

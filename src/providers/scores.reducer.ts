import { AddMakiScoreAction, CreatePlayerAction, SetScoreAction } from './scores.actions';

export type Actions = AddMakiScoreAction | CreatePlayerAction | SetScoreAction;

const addMakiScore = (state: ScoresState, action: AddMakiScoreAction): ScoresState => {
    const { playerId, round, pointsToAdd } = action.payload;

    // Clone the player record to avoid modifying underlying array by ref
    const playerRecord = JSON.parse(JSON.stringify(state[playerId]));
    const roundsArrayClone = [...playerRecord.rounds];
    const newRawScore = roundsArrayClone[round].rawScore + pointsToAdd;
    roundsArrayClone[round].rawScore = newRawScore;

    return {
        ...state,
        [playerId]: {
            ...state[playerId],
            rounds: roundsArrayClone,
        },
    };
};

const createPlayer = (state: ScoresState, action: CreatePlayerAction): ScoresState => {
    const { playerId } = action.payload;
    return {
        ...state,
        [playerId]: {
            rounds: [
                { rawScore: 0, makiQty: 0 },
                { rawScore: 0, makiQty: 0 },
                { rawScore: 0, makiQty: 0 },
            ],
            puddingQty: 0,
        },
    };
};

/**
 * Selects the desired player's rounds array, modifies the selected index, and sets the new state
 * @returns new Scores state
 */
const setPlayerScore = (state: ScoresState, action: SetScoreAction): ScoresState => {
    const { playerId, round, rawScore, makiQty, puddingQty } = action.payload;
    const roundsArrayClone = [...state[playerId].rounds];
    roundsArrayClone[round] = { rawScore, makiQty };

    return {
        ...state,
        [playerId]: {
            ...state[playerId],
            rounds: roundsArrayClone,
            puddingQty: state[playerId].puddingQty + puddingQty,
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
        default:
            return state;
    }
};

export default reducer;

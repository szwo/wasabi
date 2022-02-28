import { AddMakiScoreAction, CreatePlayerAction, SetScoreAction } from './scores.actions';

export type Actions = AddMakiScoreAction | CreatePlayerAction | SetScoreAction;

const addMakiScore = (state: ScoresState, action: AddMakiScoreAction): ScoresState => {
    const { playerId, round, pointsToAdd } = action.payload;
    const currentRoundKey = 'round' + round;

    return {
        ...state,
        [playerId]: {
            ...state[playerId],
            [currentRoundKey]: {
                // @ts-expect-error TODO: Fix me
                ...state[playerId][currentRoundKey],
                // @ts-expect-error TODO: Fix me
                rawScore: state[playerId][currentRoundKey].rawScore + pointsToAdd,
            },
        },
    };
};

const createPlayer = (state: ScoresState, action: CreatePlayerAction): ScoresState => {
    const { playerId } = action.payload;
    return {
        ...state,
        [playerId]: {
            round1: { rawScore: 0, makiQty: 0 },
            round2: { rawScore: 0, makiQty: 0 },
            round3: { rawScore: 0, makiQty: 0 },
            puddingQty: 0,
        },
    };
};

const setPlayerScore = (state: ScoresState, action: SetScoreAction): ScoresState => {
    const { playerId, round, rawScore, makiQty, puddingQty } = action.payload;
    const currentRoundKey = 'round' + round;

    return {
        ...state,
        [playerId]: {
            ...state[playerId],
            [currentRoundKey]: {
                rawScore,
                makiQty,
            },
            puddingQty: state[playerId].puddingQty + puddingQty,
        },
    };
};

const reducer = (state: ScoresState, action: Actions): ScoresState => {
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

// Actions

export type AddMakiScores = {
    type: 'ADD_MAKI_SCORES';
    payload: {
        playerId: string;
        round: number;
        pointsToAdd: number;
    };
};

export type CreatePlayerAction = {
    type: 'CREATE_PLAYER';
    payload: {
        playerId: string;
    };
};

export type SetScoreAction = {
    type: 'SET_SCORE';
    payload: {
        playerId: string;
        round: number;
        rawScore: number;
        makiQty: number;
        puddingQty: number;
    };
};

export type Actions = AddMakiScores | CreatePlayerAction | SetScoreAction;

const addMakiScores = (state: Record<string, Player>, action: AddMakiScores): Record<string, Player> => {
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

const createPlayer = (state: Record<string, Player>, action: CreatePlayerAction): Record<string, Player> => {
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

const setPlayerScore = (state: Record<string, Player>, action: SetScoreAction): Record<string, Player> => {
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

const reducer = (state: Record<string, Player>, action: Actions): Record<string, Player> => {
    switch (action.type) {
        case 'ADD_MAKI_SCORES':
            return addMakiScores(state, action);
        case 'CREATE_PLAYER':
            return createPlayer(state, action);
        case 'SET_SCORE':
            return setPlayerScore(state, action);
        default:
            return state;
    }
};

export default reducer;

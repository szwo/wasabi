import { AddMakiScoreAction, CreatePlayerAction, SetScoreAction, TotalRoundScoresAction } from './scores.actions';

export type Actions = AddMakiScoreAction | CreatePlayerAction | SetScoreAction | TotalRoundScoresAction;

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
 * Iterates through the scores and adds raw + maki scoring to set totalScore per round
 */
const totalRoundScores = (state: ScoresState, action: TotalRoundScoresAction): ScoresState => {
    const { round } = action.payload;
    // Update all player scores with total score
    // TODO: Clean this up -- Find a way to do with without deep cloning object
    const newPlayersObject: Record<string, Player> = JSON.parse(JSON.stringify(state.players));

    for (const playerScoreObject of Object.values(newPlayersObject)) {
        const closingRoundScores = playerScoreObject.rounds[round];
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
            return totalRoundScores(state, action);
        default:
            return state;
    }
};

export default reducer;

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

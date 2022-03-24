export type AddMakiScoreAction = {
    type: 'ADD_MAKI_SCORE';
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

export type TotalRoundScoresAction = {
    type: 'TOTAL_ROUND_SCORES';
    payload: {
        round: number;
    };
};

export type CreatePlayerAction = {
    type: 'CREATE_PLAYER';
    payload: {
        playerId: string;
    };
};

export type SetPlayerRoundScoreAction = {
    type: 'SET_PLAYER_ROUND_SCORE';
    payload: {
        round: number;
        playerId: string;
        scores: RoundScore;
        puddingQty: number;
    };
};

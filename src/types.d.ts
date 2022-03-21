type Item = {
    calculation: (quantity: number) => number;
    description: string;
    max: number;
    name: string;
    wasabiEligible: boolean;
};

type Quantity = {
    rawQuantity: number;
    quantityWithWasabi: number;
    score: number;
};

// Context Types

type RoundScore = {
    rawScore: number;
    makiQty: number;
    makiScore: number;
    totalScore: number;
};

type Player = {
    rounds: Array<RoundScore>;
    puddingQty: number;
};

type ScoresState = {
    players: Record<string, Player>;
    currentRound: number;
};

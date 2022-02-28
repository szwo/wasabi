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
};

type Player = {
    round1: RoundScore;
    round2: RoundScore;
    round3: RoundScore;
    puddingQty: number;
};

type ScoresState = Record<string, Player>;

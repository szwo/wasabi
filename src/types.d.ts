type PlayerScore = {
    score: number;
    maki: number;
    pudding: number;
};

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

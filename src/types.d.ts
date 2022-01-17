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

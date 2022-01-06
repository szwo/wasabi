type Item = {
    name: string;
    description: string;
    max: number;
    calculation: (quantity: number) => number;
}

type Quantity = {
    rawQuantity: number;
    quantityWithWasabi: number;
    score: number;
}
const calculateDumplingScore = (quantity: number): number => {
    switch (quantity) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 3;
        case 3:
            return 6;
        case 4:
            return 10;
        default:
            return 15;
    }
};

const items: Record<string, Item> = {
    eggNigiri: {
        calculation: (quantity: number) => quantity * 1,
        description: '1 point each',
        max: 5,
        name: 'Egg Nigiri',
        wasabiEligible: true,
    },
    salmonNigiri: {
        calculation: (quantity: number) => quantity * 2,
        description: '2 points each',
        max: 10,
        name: 'Salmon Nigiri',
        wasabiEligible: true,
    },
    squidNigiri: {
        calculation: (quantity: number) => quantity * 3,
        description: '3 points each',
        max: 5,
        name: 'Squid Nigiri',
        wasabiEligible: true,
    },
    dumpling: {
        calculation: calculateDumplingScore,
        description: 'Variable scoring based on quantity',
        max: 5,
        name: 'Dumpling',
        wasabiEligible: false,
    },
    tempura: {
        calculation: (quantity: number) => Math.floor(quantity / 2) * 5,
        description: '5 points per pair',
        max: 14,
        name: 'Tempura',
        wasabiEligible: false,
    },
    sashimi: {
        calculation: (quantity: number) => Math.floor(quantity / 3) * 10,
        description: '10 points per trio',
        max: 14,
        name: 'Sashimi',
        wasabiEligible: false,
    },
};

export default items;

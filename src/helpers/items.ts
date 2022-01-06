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
        name: 'Egg Nigiri',
        description: '1 point each',
        max: 5,
        calculation: (quantity: number) => quantity * 1,
    },
    eggNigiriWasabi: {
        name: 'Egg Nigiri + Wasabi',
        description: '1 * 3 points each',
        max: 5,
        calculation: (quantity: number) => quantity * 3,
    },
    salmonNigiri: {
        name: 'Salmon Nigiri',
        description: '2 points each',
        max: 10,
        calculation: (quantity: number) => quantity * 2,
    },
    salmonNigiriWasabi: {
        name: 'Salmon Nigiri + Wasabi',
        description: '2 * 3 points each',
        max: 6,
        calculation: (quantity: number) => quantity * 6,
    },
    squidNigiri: {
        name: 'Squid Nigiri',
        description: '3 points each',
        max: 5,
        calculation: (quantity: number) => quantity * 3,
    },
    squidNigiriWasabi: {
        name: 'Squid Nigiri + Wasabi',
        description: '3 * 3 points each',
        max: 5,
        calculation: (quantity: number) => quantity * 9,
    },
    dumpling: {
        name: 'Dumpling',
        description: 'Variable scoring based on quantity',
        max: 5,
        calculation: calculateDumplingScore,
    },
    tempura: {
        name: 'Tempura',
        description: '5 points per pair',
        max: 14,
        calculation: (quantity: number) => Math.floor(quantity / 2) * 5,
    },
    sashimi: {
        name: 'Sashimi',
        description: '10 points per trio',
        max: 14,
        calculation: (quantity: number) => Math.floor(quantity / 3) * 10,
    },
};

export default items;

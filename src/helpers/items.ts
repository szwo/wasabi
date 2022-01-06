const calculateDumplingScore = (quantity: number): number => {
    const score = (quantity: number) => {
        switch (quantity) {
            case 1:
                return 1;
            case 2:
                return 3;
            case 3:
                return 6;
            case 4:
                return 10;
            case 5:
                return 15;
            default:
                return 0;
        }
    };

    let result = 0;
    const multiplier = Math.floor(quantity / 5);
    result += score(5) * multiplier;
    result += score(quantity % 5);

    return result;
};

const items = [
    {
        id: 1,
        name: 'Egg Roll',
        description: '1 point each',
        calculation: (quantity: number) => quantity * 1,
    },
    {
        id: 2,
        name: 'Egg Roll + Wasabi',
        description: '1 * 3 points each',
        calculation: (quantity: number) => quantity * 3,
    },
    {
        id: 3,
        name: 'Salmon Roll',
        description: '2 points each',
        calculation: (quantity: number) => quantity * 2,
    },
    {
        id: 4,
        name: 'Salmon Roll + Wasabi',
        description: '2 * 3 points each',
        calculation: (quantity: number) => quantity * 6,
    },
    {
        id: 5,
        name: 'Squid Roll',
        description: '3 points each',
        calculation: (quantity: number) => quantity * 3,
    },
    {
        id: 6,
        name: 'Squid Roll + Wasabi',
        description: '3 * 3 points each',
        calculation: (quantity: number) => quantity * 9,
    },
    {
        id: 7,
        name: 'Dumpling',
        description: 'Variable scoring based on quantity',
        calculation: calculateDumplingScore,
    },
    {
        id: 8,
        name: 'Tempura',
        description: '5 points per pair',
        calculation: (quantity: number) => Math.floor(quantity / 2) * 5,
    },
    {
        id: 9,
        name: 'Sashimi',
        description: '10 points per trio',
        calculation: (quantity: number) => Math.floor(quantity / 3) * 10,
    },
];

export default items;

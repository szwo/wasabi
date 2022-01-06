import Item from 'components/item';
import { ItemProps } from 'components/item/item.component';
import React, { FC } from 'react';

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
        name: 'Egg Roll',
        description: '1 point each',
        calculation: (quantity: number) => quantity * 1,
    },
    {
        name: 'Egg Roll + Wasabi',
        description: '1 * 3 points each',
        calculation: (quantity: number) => quantity * 3,
    },
    {
        name: 'Salmon Roll',
        description: '2 points each',
        calculation: (quantity: number) => quantity * 2,
    },
    {
        name: 'Salmon Roll + Wasabi',
        description: '2 * 3 points each',
        calculation: (quantity: number) => quantity * 6,
    },
    {
        name: 'Squid Roll',
        description: '3 points each',
        calculation: (quantity: number) => quantity * 3,
    },
    {
        name: 'Squid Roll + Wasabi',
        description: '3 * 3 points each',
        calculation: (quantity: number) => quantity * 9,
    },
    {
        name: 'Dumpling',
        description: 'Variable scoring based on quantity',
        calculation: calculateDumplingScore,
    },
];

const ScoreCard: FC = () => {
    return (
        <>
            {items.map(item => (
                <Item {...(item as ItemProps)} />
            ))}
        </>
    );
};

export default ScoreCard;

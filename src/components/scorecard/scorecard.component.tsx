import Item from 'components/item';
import { ItemProps } from 'components/item/item.component';
import items from 'helpers/items';
import React, { FC, useEffect, useState } from 'react';
import './scorecard.styles.scss';

/**
 * Helper function for initializing the quantity map
 * @returns {Record<string, Quantity} Empty Quantity Map with 0 values
 */
const getEmptyQuantityMap = (): Record<string, Quantity> => {
    const map: Record<string, Quantity> = {};

    Object.keys(items).forEach(item => {
        map[item] = {
            rawQuantity: 0,
            quantityWithWasabi: 0,
            score: 0,
        };
    });

    return map;
};

const ScoreCard: FC = () => {
    const [quantities, setQuantities] = useState<Record<string, Quantity>>(getEmptyQuantityMap());
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        // TODO: This is expensive, find a better way to not recalculate score with each change
        const total = Object.keys(quantities).reduce((acc, item) => {
            const { score } = quantities[item];
            return acc + score;
        }, 0);

        setTotalScore(total);
    }, [quantities]);

    const setQuantity = (id: string, quantity: number): void => {
        setQuantities(currentQuantities => {
            return {
                ...currentQuantities,
                [id]: {
                    ...currentQuantities[id],
                    rawQuantity: quantity,
                    score: items[id].calculation(quantity),
                },
            };
        });
    };

    const itemNodes = [];

    for (const [key, value] of Object.entries(items)) {
        const props: ItemProps = {
            id: key,
            ...value,
            quantity: quantities[key],
            setQuantity,
        };

        const node = <Item key={key} {...props} />;

        itemNodes.push(node);
    }

    return (
        <>
            <div className="pinned">Total Score: {totalScore}</div>
            {itemNodes}
        </>
    );
};

export default ScoreCard;

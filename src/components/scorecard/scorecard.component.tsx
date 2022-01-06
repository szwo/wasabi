import Item from 'components/item';
import { ItemProps } from 'components/item/item.component';
import items from 'helpers/items';
import React, { FC, useEffect, useState } from 'react';

const ScoreCard: FC = () => {
    const [totalScore, setTotalScore] = useState(0);
    const [itemScores, setItemScores] = useState<Record<string, number>>({});

    useEffect(() => {
        const newScore = Object.values(itemScores).reduce((a, b) => a + b, 0);
        setTotalScore(newScore);
    }, [itemScores]);

    const updateScore = (id: string, score: number) => {
        setItemScores(currentScores => {
            return {
                ...currentScores,
                [id]: score,
            };
        });
    };

    return (
        <>
            <div>Total Score: {totalScore}</div>
            {items.map(item => (
                <Item key={item.id} {...({ ...item, updateScore } as ItemProps)} />
            ))}
        </>
    );
};

export default ScoreCard;

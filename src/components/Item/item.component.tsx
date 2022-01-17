import { Card, CardContent, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import QuantityPicker from '../QuantityPicker';
export interface ItemProps {
    calculation: (quantity: number) => number;
    description: string;
    max: number;
    name: string;
    score: number;
    setScore: (quantity: number) => void;
    wasabiEligible: boolean;
}

const Item: FC<ItemProps> = (props: ItemProps) => {
    const { name, description, max, calculation, score, setScore, wasabiEligible } = props;
    const [quantity, setQuantity] = useState(0);
    const [wasabiQuantity, setWasabiQuantity] = useState(0);

    useEffect(() => {
        let score = calculation(quantity);

        if (wasabiEligible) {
            score += calculation(wasabiQuantity) * 3;
        }

        setScore(score);
    }, [quantity, wasabiQuantity]);

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {name}
                </Typography>
                <div>Item Description: {description}</div>
                <QuantityPicker max={max} quantity={quantity} setQuantity={setQuantity} />
                {wasabiEligible && (
                    <>
                        <p>Wasabi:</p>
                        <QuantityPicker max={max} quantity={wasabiQuantity} setQuantity={setWasabiQuantity} />
                    </>
                )}
                <div>Total Points: {score}</div>
            </CardContent>
        </Card>
    );
};

export default Item;

import { Paper, Typography } from '@mui/material';
import { useRound } from 'hooks';
import React, { FC, useEffect, useState } from 'react';
import QuantityPicker from '../QuantityPicker';
import './item.styles.scss';

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

    const { currentRound } = useRound();

    useEffect(() => {
        let score = calculation(quantity);

        if (wasabiEligible) {
            score += calculation(wasabiQuantity) * 3;
        }

        setScore(score);
    }, [quantity, wasabiQuantity]);

    useEffect(() => {
        setQuantity(0);
        setWasabiQuantity(0);
    }, [currentRound]);

    return (
        <div className="item--paper-container">
            <Paper elevation={3}>
                <div className="item--container">
                    <div className="item--header">
                        <Typography gutterBottom variant="h5">
                            {name}
                        </Typography>
                        <div className="item--total">Total: {score}</div>
                    </div>
                    <div className="item--picker-container">
                        <div className="item--description">{description}</div>
                        <div className="item--picker">
                            <QuantityPicker max={max} quantity={quantity} setQuantity={setQuantity} />
                        </div>
                        {wasabiEligible && (
                            <div className="item--wasabi-container">
                                <div className="item--description">x3 with Wasabi</div>
                                <div className="item--picker">
                                    <QuantityPicker
                                        max={max}
                                        quantity={wasabiQuantity}
                                        setQuantity={setWasabiQuantity}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Item;

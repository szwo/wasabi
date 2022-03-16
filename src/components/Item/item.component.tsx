import { Grid, Paper, Typography } from '@mui/material';
import { useScoresContext } from 'hooks';
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

    const [state] = useScoresContext();
    const { currentRound } = state;

    useEffect(() => {
        let score = calculation(quantity);

        if (wasabiEligible) {
            score += calculation(wasabiQuantity) * 3;
        }

        setScore(score);
    }, [quantity, wasabiQuantity]);

    useEffect(() => setQuantity(0), [currentRound]);

    return (
        <div className="card-container">
            <Paper elevation={3}>
                <div className="paper-contents">
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="h5">
                                {name}
                            </Typography>
                            <div className="item-total">Total: {score}</div>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container>
                                <Grid item xs={wasabiEligible ? 6 : 12}>
                                    <div className="description">{description}</div>
                                    <QuantityPicker max={max} quantity={quantity} setQuantity={setQuantity} />
                                </Grid>
                                {wasabiEligible && (
                                    <Grid item xs={6}>
                                        <div className="description">x3 with Wasabi</div>
                                        <QuantityPicker
                                            max={max}
                                            quantity={wasabiQuantity}
                                            setQuantity={setWasabiQuantity}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>
    );
};

export default Item;

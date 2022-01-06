import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

export interface ItemProps {
    id: number;
    name: string;
    description: string;
    calculation: (quantity: number) => number;
    updateScore: (id: string, score: number) => void;
}

const Item: FC<ItemProps> = (props: ItemProps) => {
    const { id, name, description, calculation, updateScore } = props;

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        updateScore(id.toString(), calculation(quantity));
    }, [quantity]);

    const updateQuantity = (delta: number): void => {
        setQuantity(quantity + delta);
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {name}
                </Typography>
                <div>Item Description: {description}</div>
                <div>
                    <div>
                        <span>Your Quantity: </span>
                        <input
                            name="quantity"
                            type="number"
                            value={quantity}
                            min="0"
                            onChange={e => setQuantity(Number(e.target.value))}
                        />
                        <ButtonGroup variant="contained" size="small">
                            <Button color="error" disabled={quantity <= 0} onClick={() => updateQuantity(-1)}>
                                -
                            </Button>
                            <Button color="success" onClick={() => updateQuantity(1)}>
                                +
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div>Total Points: {calculation(quantity)}</div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Item;

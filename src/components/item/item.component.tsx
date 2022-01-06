import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';

export interface ItemProps {
    id: string;
    name: string;
    description: string;
    max: number;
    quantity: Quantity;
    setQuantity: (id: string, quantity: number) => void;
}

const Item: FC<ItemProps> = (props: ItemProps) => {
    const { id, name, description, max, quantity, setQuantity } = props;
    const { rawQuantity, score } = quantity;

    const updateQuantity = (delta: number) => {
        setQuantity(id, rawQuantity + delta);
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {name}
                </Typography>
                <div>Item Description: {description}</div>
                <div>
                    <div>
                        <span>Your Quantity: {rawQuantity}</span>
                    </div>
                    <ButtonGroup variant="contained" size="small">
                        <Button 
                            color="error"
                            disabled={rawQuantity <= 0} 
                            onClick={() => updateQuantity(-1)}>
                            -
                        </Button>
                        <Button 
                            color="success"
                            disabled={rawQuantity >= max} 
                            onClick={() => updateQuantity(1)}>
                            +
                        </Button>
                    </ButtonGroup>
                    <div>Total Points: {score}</div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Item;

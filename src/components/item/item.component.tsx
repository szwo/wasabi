import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import React, { FC, useState } from 'react';

export interface ItemProps {
    name: string;
    description: string;
    calculation: (quantity: number) => number;
}

const Item: FC<ItemProps> = (props: ItemProps) => {
    const [quantity, setQuantity] = useState(0);
    const { name, description, calculation } = props;

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
                            <Button color="error" disabled={quantity <= 0} onClick={() => setQuantity(quantity - 1)}>
                                -
                            </Button>
                            <Button color="success" onClick={() => setQuantity(quantity + 1)}>
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

import { Button, ButtonGroup } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';

interface QuantityPickerProps {
    max: number;
    quantity: number;
    setQuantity: Dispatch<SetStateAction<number>>;
}

const QuantityPicker: FC<QuantityPickerProps> = (props: QuantityPickerProps) => {
    const { max, quantity, setQuantity } = props;

    const updateQuantity = (delta: number) => {
        setQuantity(currentQuantity => currentQuantity + delta);
    };

    return (
        <div>
            <div>
                <span>Your Quantity: {quantity}</span>
            </div>
            <ButtonGroup variant="contained" size="small">
                <Button color="error" disabled={quantity <= 0} onClick={() => updateQuantity(-1)}>
                    -
                </Button>
                <Button color="success" disabled={quantity >= max} onClick={() => updateQuantity(1)}>
                    +
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default QuantityPicker;

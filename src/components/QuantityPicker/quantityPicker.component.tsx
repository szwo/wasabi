import { Button, ButtonGroup } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

interface QuantityPickerProps {
    max: number;
    setQuantity: (quantity: number) => void;
}

const QuantityPicker: FC<QuantityPickerProps> = (props: QuantityPickerProps) => {
    const { max, setQuantity } = props;
    const [localQuantity, setLocalQuantity] = useState(0);

    useEffect(() => {
        setQuantity(localQuantity);
    }, [localQuantity]);

    const updateQuantity = (delta: number) => {
        setLocalQuantity(currentQuantity => currentQuantity + delta);
    };

    return (
        <div>
            <div>
                <span>Your Quantity: {localQuantity}</span>
            </div>
            <ButtonGroup variant="contained" size="small">
                <Button color="error" disabled={localQuantity <= 0} onClick={() => updateQuantity(-1)}>
                    -
                </Button>
                <Button color="success" disabled={localQuantity >= max} onClick={() => updateQuantity(1)}>
                    +
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default QuantityPicker;

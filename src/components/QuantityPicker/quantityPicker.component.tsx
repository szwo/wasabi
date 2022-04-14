import { Button, ButtonGroup } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';
import './quantityPicker.styles.scss';

export interface QuantityPickerProps {
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
            <ButtonGroup variant="contained" size="small">
                <Button
                    className="quantity-button"
                    data-testid="quantity-picker--decrement"
                    color="error"
                    disabled={quantity <= 0}
                    onClick={() => updateQuantity(-1)}
                >
                    -
                </Button>
                <input
                    className="number-input"
                    data-testid="quantity-picker--input"
                    type="number"
                    value={quantity.toString()}
                    onChange={e => setQuantity(parseInt(e.target.value) || 0)}
                />
                <Button
                    className="quantity-button"
                    data-testid="quantity-picker--increment"
                    color="success"
                    disabled={quantity >= max}
                    onClick={() => updateQuantity(1)}
                >
                    +
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default QuantityPicker;

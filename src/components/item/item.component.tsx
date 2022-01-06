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
        <>
            <div>
                <div>Item Title: {name}</div>
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
                        <button disabled={quantity <= 0} onClick={() => setQuantity(quantity - 1)}>
                            -
                        </button>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <div>Total Points: {calculation(quantity)}</div>
                </div>
            </div>
        </>
    );
};

export default Item;

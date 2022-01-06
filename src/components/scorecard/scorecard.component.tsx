import Item from 'components/item';
import { ItemProps } from 'components/item/item.component';
import items from 'helpers/items';
import React, { FC } from 'react';

const ScoreCard: FC = () => {
    return (
        <>
            {items.map(item => (
                <Item {...(item as ItemProps)} />
            ))}
        </>
    );
};

export default ScoreCard;

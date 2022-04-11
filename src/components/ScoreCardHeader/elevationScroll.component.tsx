import { useScrollTrigger } from '@mui/material';
import React, { cloneElement } from 'react';

interface ElevationScrollProps {
    children: React.ReactElement;
}

const ElevationScroll = (props: ElevationScrollProps) => {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    });

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};

export default ElevationScroll;

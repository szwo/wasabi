import { useScrollTrigger } from '@mui/material';
import React, { cloneElement } from 'react';

interface ElevationScrollProps {
    children: React.ReactElement;
}

const ElevationScroll = (props: ElevationScrollProps) => {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
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

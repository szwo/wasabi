import { Alert, Snackbar } from '@mui/material';
import { useToast } from 'hooks';
import React, { FC } from 'react';

const Toast: FC = () => {
    const { severity, message, toastTimeout, isToastOpen, closeToast } = useToast();

    return (
        <Snackbar open={isToastOpen} onClose={closeToast} autoHideDuration={toastTimeout}>
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    );
};

export default Toast;

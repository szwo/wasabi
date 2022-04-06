import { AlertColor } from '@mui/material';
import React, { createContext, FC, ReactElement, useState } from 'react';

export type ToastContextType = {
    severity: AlertColor;
    message: string | undefined;
    toastTimeout: number;
    isToastOpen: boolean;
    displayToast: (severity: AlertColor, message: string, timeout?: number) => void;
    closeToast: () => void;
};
export const ToastContext = createContext<ToastContextType>({} as ToastContextType);
interface ProviderProps {
    children: ReactElement;
}

const ToastProvider: FC<ProviderProps> = (props: ProviderProps) => {
    const { children } = props;
    const [severity, setSeverity] = useState<AlertColor>('info');
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [toastTimeout, setToastTimeout] = useState(5000);
    const [isToastOpen, setIsToastOpen] = useState(false);

    const displayToast = (_severity: AlertColor, _message: string, _timeout = 5000) => {
        setSeverity(_severity);
        setMessage(_message);
        setToastTimeout(_timeout);
        setIsToastOpen(true);
    };

    const closeToast = () => {
        setIsToastOpen(false);
    };

    return (
        <ToastContext.Provider
            value={{
                severity,
                message,
                toastTimeout,
                isToastOpen,
                displayToast,
                closeToast,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;

import { useContext } from 'react';
import { ToastContext, ToastContextType } from 'providers/Toast/toast.provider';

const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
};

export default useToast;

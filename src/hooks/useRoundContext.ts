import { useContext } from 'react';
import { RoundContext, RoundContextType } from 'providers/Round/round.provider';

const useRoundContext = (): RoundContextType => {
    const context = useContext(RoundContext);
    if (!context) {
        throw new Error('useRoundContext must be used within a RoundProvider');
    }

    return context;
};

export default useRoundContext;

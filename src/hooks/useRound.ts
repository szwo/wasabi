import { useContext } from 'react';
import { RoundContext, RoundContextType } from 'providers/Round/round.provider';

const useRound = (): RoundContextType => {
    const context = useContext(RoundContext);
    if (!context) {
        throw new Error('useRound must be used within a RoundProvider');
    }

    return context;
};

export default useRound;

import { useContext } from 'react';
import { ScoresContext, ScoresContextType } from 'providers/scores.provider';

const useScoresContext = (): ScoresContextType => {
    const context = useContext(ScoresContext);
    if (!context) {
        throw new Error('useScoresContext must be used within a ScoresProvider');
    }

    return context;
};

export default useScoresContext;

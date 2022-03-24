import RoundProvider from 'providers/Round/round.provider';
import ScoresProvider from 'providers/Scores/scores.provider';
import React from 'react';
import Setup from 'components/Setup';

const App = () => {
    return (
        <RoundProvider>
            <ScoresProvider>
                <Setup />
            </ScoresProvider>
        </RoundProvider>
    );
};

export default App;

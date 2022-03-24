import ScoresProvider from 'providers/Scores/scores.provider';
import React from 'react';
import Setup from 'components/Setup';

const App = () => {
    return (
        <ScoresProvider>
            <Setup />
        </ScoresProvider>
    );
};

export default App;

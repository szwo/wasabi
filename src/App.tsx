import { RoundProvider, ScoresProvider } from 'providers';
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

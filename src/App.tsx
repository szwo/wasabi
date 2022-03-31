import { RoundProvider, ScoresProvider } from 'providers';
import React, { useState } from 'react';
import Setup from 'components/Setup';
import Game from 'components/Game';

const App = () => {
    const [showGame, setShowGame] = useState(false);
    const gameComponent = (
        <RoundProvider>
            <Game />
        </RoundProvider>
    );

    return <ScoresProvider>{showGame ? gameComponent : <Setup showGame={() => setShowGame(true)} />}</ScoresProvider>;
};

export default App;

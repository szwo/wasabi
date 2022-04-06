import { RoundProvider, ScoresProvider, ToastProvider } from 'providers';
import React, { useState } from 'react';
import Setup from 'components/Setup';
import Game from 'components/Game';
import Toast from 'components/Toast';

const App = () => {
    const [showGame, setShowGame] = useState(false);
    const gameComponent = (
        <RoundProvider>
            <Game />
        </RoundProvider>
    );

    return (
        <>
            <ToastProvider>
                <>
                    <ScoresProvider>
                        {showGame ? gameComponent : <Setup showGame={() => setShowGame(true)} />}
                    </ScoresProvider>
                    <Toast />
                </>
            </ToastProvider>
        </>
    );
};

export default App;

import ScoresProvider from 'providers/scores.provider';
import React from 'react';
import './App.scss';
import Game from 'components/Game';

const App = () => {
    return (
        <ScoresProvider>
            <Game />
        </ScoresProvider>
    );
};

export default App;

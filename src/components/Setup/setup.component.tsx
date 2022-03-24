import React, { FC, useState } from 'react';
import Game from 'components/Game';
import { CreatePlayerAction } from 'providers/scores.actions';
import { useScoresContext } from 'hooks';

const Setup: FC = () => {
    const [showGame, setShowGame] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [state, dispatch] = useScoresContext();
    const minimumPlayersMet = Object.keys(state.players).length < 2;

    const handleCreatePlayer = () => {
        if (Object.prototype.hasOwnProperty.call(state.players, playerName)) {
            // TODO: Display toast instead of console warning
            console.warn('name already taken');
        } else {
            const action: CreatePlayerAction = {
                type: 'CREATE_PLAYER',
                payload: {
                    playerId: playerName,
                },
            };
            dispatch(action);
            setPlayerName('');
        }
    };

    if (showGame) {
        return <Game />;
    }

    return (
        <div className="setup">
            <p>Hello, I'm the setup component</p>
            <div>
                <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} />
                <button onClick={handleCreatePlayer} disabled={playerName.length === 0}>
                    Create Player
                </button>
            </div>
            <button onClick={() => setShowGame(true)} disabled={minimumPlayersMet}>
                {minimumPlayersMet
                    ? `Need at least ${2 - Object.keys(state.players).length} more players to play`
                    : 'Start Game!'}
            </button>
        </div>
    );
};

export default Setup;

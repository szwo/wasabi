import React, { FC, useState } from 'react';
import { useScores } from 'hooks';

interface SetupProps {
    showGame: () => void;
}

const Setup: FC<SetupProps> = (props: SetupProps) => {
    const { showGame } = props;
    const [playerName, setPlayerName] = useState('');
    const { getPlayers, createPlayer } = useScores();
    const players = getPlayers();
    const playerIds = Object.keys(players);
    const minimumPlayersMet = playerIds.length < 2;

    const handleCreatePlayer = () => {
        if (Object.prototype.hasOwnProperty.call(players, playerName)) {
            // TODO: Display toast instead of console warning
            console.warn('name already taken');
        } else {
            createPlayer(playerName);
            setPlayerName('');
        }
    };

    return (
        <div className="setup">
            <p>Hello, I'm the setup component</p>
            <div>
                <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} />
                <button onClick={handleCreatePlayer} disabled={playerName.length === 0}>
                    Create Player
                </button>
            </div>
            <button onClick={showGame} disabled={minimumPlayersMet}>
                {minimumPlayersMet ? `Need at least ${2 - playerIds.length} more players to play` : 'Start Game!'}
            </button>
        </div>
    );
};

export default Setup;
